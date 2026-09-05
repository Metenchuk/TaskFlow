import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { TEMPLATE_ICONS, TEMPLATE_COLORS } from './templateIcons';

type Props = {
  template: { key: string; title: string; desc: string; color: string; icon: string; taskCount: number };
  index: number;
  loading: boolean;
  onSelect: () => void;
};

export default function TemplateCard({ template, index, loading, onSelect }: Props) {
  const Icon = TEMPLATE_ICONS[template.icon] ?? TEMPLATE_ICONS.plus;
  const grad = TEMPLATE_COLORS[template.color] ?? TEMPLATE_COLORS.indigo;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}
      onClick={onSelect} disabled={loading}
      className="group flex flex-col rounded-2xl border border-[#374151] bg-[#1f2937] p-5 text-left transition-colors hover:border-[#4f46e5] disabled:opacity-60"
    >
      <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${grad}`}>
        {loading ? <Loader2 className="h-6 w-6 animate-spin text-white" /> : <Icon className="h-6 w-6 text-white" />}
      </span>
      <h3 className="mt-4 text-lg font-bold text-white">{template.title}</h3>
      <p className="mt-1 flex-1 text-sm text-white/55">{template.desc}</p>
      <span className="mt-4 text-xs font-medium text-white/40">
        {template.taskCount > 0 ? `${template.taskCount} starter tasks` : 'Empty project'}
      </span>
    </motion.button>
  );
}