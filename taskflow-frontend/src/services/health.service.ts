import { api } from '../lib/axios';

export type ProjectHealth = {
  id: string;
  title: string;
  color: string;
  score: number;
  grade: 'excellent' | 'good' | 'at_risk' | 'critical';
  total: number;
  done: number;
  overdue: number;
  progress: number;
  factors: { label: string; impact: number }[];
};

export type HealthSummary = {
  average: number;
  total: number;
  atRisk: number;
  healthy: number;
  projects: ProjectHealth[];
};

export const healthService = {
  projects: () => api.get<HealthSummary>('/health/projects').then((r) => r.data),
};