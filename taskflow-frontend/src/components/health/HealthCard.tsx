import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { ProjectHealth } from '../../services/health.service';
import { GRADE_META } from './gradeStyles';
import ScoreRing from './ScoreRing';

export default function HealthCard({ project, index }: { project: ProjectHealth; index: number }) {
  const navigate = useNavigate();
  const meta = GRADE_META[project.grade];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/projects/${project.id}/overview`)}
      className="cursor-pointer rounded-2xl border border-[#374151] bg-[#1f2937] p-5 transition-colors hover:border-[#4f46e5]"
    >
      <div className="flex items-center gap-4">
        <ScoreRing score={project.score} color={meta.ring} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold text-white">{project.title}</h3>
          <span className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${meta.bg} ${meta.text}`}>
            {meta.label}
          </span>
          <p className="mt-2 text-sm text-white/50">
            {project.done}/{project.total} done · {project.overdue} overdue
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-1.5 border-t border-[#374151] pt-4">
        {project.factors.length === 0 && (
          <p className="text-sm text-white/40">No signals yet</p>
        )}
        {project.factors.map((f) => (
          <div key={f.label} className="flex items-center justify-between text-sm">
            <span className="text-white/60">{f.label}</span>
            <span className={`flex items-center gap-1 font-medium ${f.impact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {f.impact >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {f.impact >= 0 ? '+' : ''}{f.impact}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}