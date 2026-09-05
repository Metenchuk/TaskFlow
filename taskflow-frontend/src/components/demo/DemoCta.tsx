import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function DemoCta() {
  const navigate = useNavigate();
  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate('/register')}
        className="tf-neon-btn inline-flex items-center gap-2.5 rounded-full border border-white/10 px-7 py-3.5 font-semibold text-white [background:linear-gradient(110deg,#22d3ee,#3b82f6_55%,#8b5cf6)] sm:px-8 sm:py-4"
      >
        Try it — free <ArrowRight className="h-5 w-5" />
      </motion.button>
      <button onClick={() => navigate('/login')} className="text-sm text-white/50 transition-colors hover:text-white">
        or log in to your account
      </button>
    </div>
  );
}