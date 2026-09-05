export type DemoStatus = 'todo' | 'in_progress' | 'done';
export type DemoPriority = 'low' | 'medium' | 'high';

export type DemoTask = {
  id: string;
  title: string;
  status: DemoStatus;
  priority: DemoPriority;
  assignee: string;
};

export const DEMO_COLUMNS: { key: DemoStatus; label: string; dot: string }[] = [
  { key: 'todo', label: 'To Do', dot: 'bg-amber-400' },
  { key: 'in_progress', label: 'In Progress', dot: 'bg-blue-500' },
  { key: 'done', label: 'Done', dot: 'bg-green-500' },
];

export const DEMO_TASKS: DemoTask[] = [
  { id: 'd1', title: 'Design new landing hero', status: 'todo', priority: 'high', assignee: 'Alex Morgan' },
  { id: 'd2', title: 'Write onboarding emails', status: 'todo', priority: 'low', assignee: 'Jamie Chen' },
  { id: 'd3', title: 'Build Kanban drag & drop', status: 'in_progress', priority: 'high', assignee: 'Sam Rivera' },
  { id: 'd4', title: 'Set up CI pipeline', status: 'in_progress', priority: 'medium', assignee: 'Alex Morgan' },
  { id: 'd5', title: 'Ship auth module', status: 'done', priority: 'high', assignee: 'Sam Rivera' },
  { id: 'd6', title: 'Database schema draft', status: 'done', priority: 'medium', assignee: 'Jamie Chen' },
];

export const DEMO_METRICS = [
  { label: 'Total Tasks', value: 42, suffix: '' },
  { label: 'Completion', value: 68, suffix: '%' },
  { label: 'Active Projects', value: 7, suffix: '' },
  { label: 'Overdue', value: 3, suffix: '' },
];

export const DEMO_STATUS_CHART = [
  { name: 'To Do', value: 12, color: '#f59e0b' },
  { name: 'In Progress', value: 18, color: '#3b82f6' },
  { name: 'Done', value: 12, color: '#22c55e' },
];

export const DEMO_PRIORITY_STYLE: Record<DemoPriority, string> = {
  low: 'bg-green-900/50 text-green-400',
  medium: 'bg-amber-900/50 text-amber-400',
  high: 'bg-red-900/50 text-red-400',
};