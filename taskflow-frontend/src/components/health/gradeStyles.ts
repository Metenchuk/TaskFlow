import type { ProjectHealth } from '../../services/health.service';

export const GRADE_META: Record<ProjectHealth['grade'], { label: string; ring: string; text: string; bg: string }> = {
  excellent: { label: 'Excellent', ring: '#22c55e', text: 'text-green-400', bg: 'bg-green-900/40' },
  good:      { label: 'Good',      ring: '#3b82f6', text: 'text-blue-400',  bg: 'bg-blue-900/40' },
  at_risk:   { label: 'At risk',   ring: '#f59e0b', text: 'text-amber-400', bg: 'bg-amber-900/40' },
  critical:  { label: 'Critical',  ring: '#ef4444', text: 'text-red-400',   bg: 'bg-red-900/40' },
};