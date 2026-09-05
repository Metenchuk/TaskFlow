import { DEMO_PRIORITY_STYLE, type DemoTask } from './data';

export default function DemoCard({ task, dragging }: { task: DemoTask; dragging?: boolean }) {
  return (
    <div className={`rounded-xl border border-[#374151] bg-[#1f2937] p-3 sm:p-4 ${dragging ? 'rotate-2 shadow-2xl' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-semibold text-white">{task.title}</h4>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize sm:px-2.5 sm:py-1 sm:text-xs ${DEMO_PRIORITY_STYLE[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <p className="mt-3 text-xs text-white/50">{task.assignee}</p>
    </div>
  );
}