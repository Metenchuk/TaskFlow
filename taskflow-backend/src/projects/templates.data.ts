export type TemplateTask = {
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
};

export type ProjectTemplate = {
  key: string;
  title: string;
  desc: string;
  color: string;
  icon: string;
  tasks: TemplateTask[];
};

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    key: 'website',
    title: 'Website Redesign',
    desc: 'Redesign and ship a marketing website',
    color: 'indigo',
    icon: 'layout',
    tasks: [
      { title: 'Audit current site', status: 'todo', priority: 'high' },
      { title: 'Wireframes & IA', status: 'todo', priority: 'high' },
      { title: 'Design system & tokens', status: 'todo', priority: 'medium' },
      { title: 'Build responsive layouts', status: 'todo', priority: 'high' },
      { title: 'SEO & meta tags', status: 'todo', priority: 'medium' },
      { title: 'QA & launch', status: 'todo', priority: 'high' },
    ],
  },
  {
    key: 'mobile',
    title: 'Mobile App',
    desc: 'Plan and build a cross-platform mobile app',
    color: 'purple',
    icon: 'smartphone',
    tasks: [
      { title: 'Define MVP scope', status: 'todo', priority: 'high' },
      { title: 'Design app screens', status: 'todo', priority: 'high' },
      { title: 'Set up navigation', status: 'todo', priority: 'medium' },
      { title: 'Auth & onboarding', status: 'todo', priority: 'high' },
      { title: 'Push notifications', status: 'todo', priority: 'low' },
      { title: 'App store submission', status: 'todo', priority: 'medium' },
    ],
  },
  {
    key: 'marketing',
    title: 'Marketing Campaign',
    desc: 'Launch a multi-channel marketing campaign',
    color: 'amber',
    icon: 'megaphone',
    tasks: [
      { title: 'Define target audience', status: 'todo', priority: 'high' },
      { title: 'Campaign messaging', status: 'todo', priority: 'high' },
      { title: 'Design ad creatives', status: 'todo', priority: 'medium' },
      { title: 'Set up landing page', status: 'todo', priority: 'medium' },
      { title: 'Schedule social posts', status: 'todo', priority: 'low' },
      { title: 'Measure & report', status: 'todo', priority: 'medium' },
    ],
  },
  {
    key: 'product',
    title: 'Product Launch',
    desc: 'Coordinate a full product launch',
    color: 'green',
    icon: 'rocket',
    tasks: [
      { title: 'Finalize feature set', status: 'todo', priority: 'high' },
      { title: 'Internal beta testing', status: 'todo', priority: 'high' },
      { title: 'Prepare docs & changelog', status: 'todo', priority: 'medium' },
      { title: 'Launch announcement', status: 'todo', priority: 'high' },
      { title: 'Collect user feedback', status: 'todo', priority: 'medium' },
    ],
  },
  {
    key: 'research',
    title: 'User Research',
    desc: 'Run a structured user research study',
    color: 'pink',
    icon: 'search',
    tasks: [
      { title: 'Define research goals', status: 'todo', priority: 'high' },
      { title: 'Recruit participants', status: 'todo', priority: 'medium' },
      { title: 'Prepare interview script', status: 'todo', priority: 'medium' },
      { title: 'Run interviews', status: 'todo', priority: 'high' },
      { title: 'Synthesize findings', status: 'todo', priority: 'high' },
    ],
  },
  {
    key: 'blank',
    title: 'Blank Project',
    desc: 'Start from scratch with no tasks',
    color: 'indigo',
    icon: 'plus',
    tasks: [],
  },
];