import { motion } from 'motion/react';
import { useCountUp } from '../../hooks/useCountUp';

type Props = {
  label: string;
  value: number;
  suffix: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  delay: number;
};

export default function DemoMetricCard({ label, value, suffix, icon: Icon, color, delay }: Props) {
  const animated = useCountUp(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="tf-card p-4 sm:p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/60 sm:text-sm">{label}</span>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
        {animated}{suffix}
      </p>
    </motion.div>
  );
}