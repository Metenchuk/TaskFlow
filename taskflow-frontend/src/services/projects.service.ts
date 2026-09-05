import { api } from '../lib/axios';
import type { Project } from '../types';

export const projectsService = {
  getAll: () => api.get<Project[]>('/projects').then((r) => r.data),
  
  getOne: (id: string) => api.get(`/projects/${id}`).then((r) => r.data),
  
  overview: (id: string) => api.get(`/projects/${id}/overview`).then((r) => r.data),
  
  create: (data: { title: string; desc: string; color?: string }) =>
    api.post<Project>('/projects', data).then((r) => r.data),
    
  templates: () =>
    api.get<{ key: string; title: string; desc: string; color: string; icon: string; taskCount: number }[]>('/projects/templates').then((r) => r.data),
    
  fromTemplate: (templateKey: string, title?: string) =>
    api.post('/projects/from-template', { templateKey, title }).then((r) => r.data),
};