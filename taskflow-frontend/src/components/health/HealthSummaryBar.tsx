import { motion } from 'motion/react';
import { Activity, ShieldCheck, AlertTriangle, FolderClosed } from 'lucide-react';
import type { HealthSummary } from '../../services/health.service';

export default function HealthSummaryBar({ data }: { data: HealthSummary }) {
  const cards = [
    { label: 'Avg. Health', value: data.average, icon: Activity, color: 'text-purple-400' },
    { label: 'Projects', value: data.total, icon: FolderClosed, color: 'text-blue-400' },
    { label: 'Healthy', value: data.healthy, icon: ShieldCheck, color: 'text-green-400' },
    { label: 'At risk', value: data.atRisk, icon: AlertTriangle, color: data.atRisk > 0 ? 'text-red-400' : 'text-white/40' },
  ];
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          className="rounded-xl border border-[#374151] bg-[#1f2937] p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60 sm:text-sm">{c.label}</span>
            <c.icon className={`h-4 w-4 ${c.color}`} />
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{c.value}</p>
        </motion.div>
      ))}
    </div>
  );
}