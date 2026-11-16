import { useNavigate } from 'react-router-dom';

export default function DemoCta() {
  const navigate = useNavigate();
  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <button
        onClick={() => navigate('/login')}
        className="text-sm text-white/50 transition-colors hover:text-white"
      >
        Log in to your account
      </button>
    </div>
  );
}