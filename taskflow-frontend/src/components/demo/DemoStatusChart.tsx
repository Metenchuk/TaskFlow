import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DEMO_STATUS_CHART } from './data';

export default function DemoStatusChart() {
  return (
    <div className="tf-card p-4 sm:p-6">
      <h3 className="text-lg font-bold text-white">Task Status</h3>
      <div className="mx-auto mt-2 h-[200px] sm:h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={DEMO_STATUS_CHART} dataKey="value" innerRadius={58} outerRadius={88} paddingAngle={3} startAngle={90} endAngle={-270}>
              {DEMO_STATUS_CHART.map((d) => <Cell key={d.name} fill={d.color} />)}
            </Pie>
            <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {DEMO_STATUS_CHART.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-white/70">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />{d.name}
            </span>
            <span className="text-white">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}