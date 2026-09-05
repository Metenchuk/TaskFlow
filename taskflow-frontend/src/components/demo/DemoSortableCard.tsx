import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DemoCard from './DemoCard';
import type { DemoTask } from './data';

export default function DemoSortableCard({ task }: { task: DemoTask }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-grab touch-none active:cursor-grabbing">
      <DemoCard task={task} />
    </div>
  );
}