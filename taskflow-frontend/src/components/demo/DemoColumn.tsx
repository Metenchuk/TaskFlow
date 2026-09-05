import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DemoSortableCard from './DemoSortableCard';
import type { DemoStatus, DemoTask } from './data';

type Props = {
  column: { key: DemoStatus; label: string; dot: string };
  tasks: DemoTask[];
};

export default function DemoColumn({ column, tasks }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: column.key });
  return (
    <div ref={setNodeRef} className={`rounded-xl bg-[#1f2937]/60 p-3 transition-colors sm:p-4 ${isOver ? 'ring-2 ring-[#4f46e5]/50' : ''}`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <span className={`h-2.5 w-2.5 rounded-full ${column.dot}`} />
        {column.label} <span className="text-white/40">({tasks.length})</span>
      </div>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="mt-4 min-h-[80px] space-y-3">
          {tasks.map((t) => <DemoSortableCard key={t.id} task={t} />)}
        </div>
      </SortableContext>
    </div>
  );
}