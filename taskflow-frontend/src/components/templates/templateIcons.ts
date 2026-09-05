import { Layout, Smartphone, Megaphone, Rocket, Search, Plus } from 'lucide-react';

export const TEMPLATE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  layout: Layout,
  smartphone: Smartphone,
  megaphone: Megaphone,
  rocket: Rocket,
  search: Search,
  plus: Plus,
};

export const TEMPLATE_COLORS: Record<string, string> = {
  indigo: 'from-[#4f46e5] to-[#6366f1]',
  purple: 'from-[#7c3aed] to-[#a855f7]',
  amber: 'from-[#d97706] to-[#f59e0b]',
  green: 'from-[#059669] to-[#10b981]',
  pink: 'from-[#db2777] to-[#ec4899]',
};