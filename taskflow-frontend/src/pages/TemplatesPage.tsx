import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, LayoutTemplate } from 'lucide-react';
import toast from 'react-hot-toast';
import { projectsService } from '../services/projects.service';
import TemplateCard from '../components/templates/TemplateCard';
import Spinner from '../components/ui/Spinner';

export default function TemplatesPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [pending, setPending] = useState<string | null>(null);

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: projectsService.templates,
  });

  const create = useMutation({
    mutationFn: (key: string) => projectsService.fromTemplate(key),
    onMutate: (key) => setPending(key),
    onSuccess: (project: any) => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created');
      navigate(`/projects/${project.id}/kanban`, { state: { from: '/projects' } });
    },
    onError: () => toast.error('Could not create project'),
    onSettled: () => setPending(null),
  });

  return (
    <div className="p-6">
      <button onClick={() => navigate('/projects')} className="mb-4 flex items-center gap-1 text-white/70 hover:text-white">
        <ChevronLeft className="h-5 w-5" /> Projects
      </button>

      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <LayoutTemplate className="h-6 w-6 text-purple-400" /> Start from a template
        </h2>
        <p className="mt-1 text-sm text-white/50">
          Pick a template to spin up a project with a ready-made set of starter tasks.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {templates.map((t, i) => (
            <TemplateCard
              key={t.key}
              template={t}
              index={i}
              loading={pending === t.key}
              onSelect={() => !pending && create.mutate(t.key)}
            />
          ))}
        </div>
      )}
    </div>
  );
}