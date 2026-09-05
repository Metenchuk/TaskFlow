import { useState } from 'react';
import {
  DndContext, DragOverlay, PointerSensor, TouchSensor,
  useSensor, useSensors, closestCorners,
  type DragStartEvent, type DragEndEvent,
} from '@dnd-kit/core';
import { RotateCcw } from 'lucide-react';
import { DEMO_COLUMNS, DEMO_TASKS, type DemoStatus, type DemoTask } from './data';
import DemoColumn from './DemoColumn';
import DemoCard from './DemoCard';

export default function DemoBoard() {
  const [tasks, setTasks] = useState<DemoTask[]>(DEMO_TASKS);
  const [active, setActive] = useState<DemoTask | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
  );

  const byColumn = (status: DemoStatus) => tasks.filter((t) => t.status === status);

  function handleDragStart(e: DragStartEvent) {
    setActive(tasks.find((t) => t.id === e.active.id) ?? null);
  }

  function handleDragEnd(e: DragEndEvent) {
    setActive(null);
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id as string;
    const column = DEMO_COLUMNS.find((c) => c.key === over.id);
    const overTask = tasks.find((t) => t.id === over.id);
    const newStatus = (column?.key ?? overTask?.status) as DemoStatus;
    if (!newStatus) return;

    setTasks((prev) => {
      const moving = prev.find((t) => t.id === activeId);
      if (!moving) return prev;
      const rest = prev.filter((t) => t.id !== activeId);
      const updated = { ...moving, status: newStatus };
      if (overTask && overTask.id !== activeId) {
        const idx = rest.findIndex((t) => t.id === overTask.id);
        rest.splice(idx, 0, updated);
        return rest;
      }
      return [...rest, updated];
    });
  }

  return (
    <div className="tf-card p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Project Board</h3>
        <button
          onClick={() => setTasks(DEMO_TASKS)}
          className="flex items-center gap-2 rounded-lg border border-[#374151] px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {DEMO_COLUMNS.map((col) => <DemoColumn key={col.key} column={col} tasks={byColumn(col.key)} />)}
        </div>
        <DragOverlay>{active ? <DemoCard task={active} dragging /> : null}</DragOverlay>
      </DndContext>
    </div>
  );
}