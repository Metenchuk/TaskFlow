import { CheckSquare, TrendingUp, FolderClosed, AlertTriangle } from 'lucide-react';
import { DEMO_METRICS } from './data';
import DemoMetricCard from './DemoMetricCard';

const ICONS = [FolderClosed, TrendingUp, CheckSquare, AlertTriangle];
const COLORS = ['text-blue-400', 'text-green-400', 'text-purple-400', 'text-red-400'];

export default function DemoMetrics() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {DEMO_METRICS.map((m, i) => (
        <DemoMetricCard
          key={m.label}
          label={m.label}
          value={m.value}
          suffix={m.suffix}
          icon={ICONS[i]}
          color={COLORS[i]}
          delay={0.15 + i * 0.06}
        />
      ))}
    </div>
  );
}