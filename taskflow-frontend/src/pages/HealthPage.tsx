import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';
import { healthService } from '../services/health.service';
import HealthSummaryBar from '../components/health/HealthSummaryBar';
import HealthCard from '../components/health/HealthCard';
import Spinner from '../components/ui/Spinner';

export default function HealthPage() {
  const { data, isLoading } = useQuery({ queryKey: ['health'], queryFn: healthService.projects });

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Activity className="h-6 w-6 text-purple-400" /> Project Health
        </h2>
        <p className="mt-1 text-sm text-white/50">
          A health score for every project based on progress, overdue work, and recent activity.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : !data || data.total === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#374151] py-20 text-center text-white/50">
          No projects to analyze yet.
        </div>
      ) : (
        <>
          <HealthSummaryBar data={data} />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.projects.map((p, i) => <HealthCard key={p.id} project={p} index={i} />)}
          </div>
        </>
      )}
    </div>
  );
}