import { motion } from 'motion/react';

export default function DemoHero() {
  return (
    <div className="text-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="tf-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white/80"
      >
        <span className="h-2 w-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]" />
        Live demo — no sign-up needed
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
      >
        Manage your team,<br />
        <span className="tf-gradient-text">ship without chaos.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-5 max-w-xl px-2 text-white/60"
      >
        Drag the cards below — this is the real board, running live. No account required.
      </motion.p>
    </div>
  );
}