import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [animateOut, setAnimateOut] = useState(false);

  // Auto-hide timer
  useEffect(() => {
    const timer = setTimeout(() => {
      // animate slide-out
      setAnimateOut(true);
      setTimeout(onClose, 400); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Toast styling configuration
  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-600',
      borderColor: 'border-green-700',
      glow: 'shadow-[0_0_12px_rgba(34,197,94,0.5)]',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-600',
      borderColor: 'border-red-700',
      glow: 'shadow-[0_0_12px_rgba(220,38,38,0.5)]',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-orange-500',
      borderColor: 'border-orange-600',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.5)]',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-600',
      borderColor: 'border-blue-700',
      glow: 'shadow-[0_0_12px_rgba(59,130,246,0.5)]',
    },
  };

  const { icon: Icon, bgColor, borderColor, glow } = config[type];

  return (
    <div
      className={`
        ${bgColor} ${borderColor} ${glow}
        border-3 text-white px-6 py-4 rounded-lg shadow-2xl 
        flex items-center gap-3 min-w-[320px] max-w-md

        transition-all duration-400
        ${animateOut ? "animate-toast-out" : "animate-toast-in"}
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />

      <p className="flex-1 font-semibold text-sm leading-snug">
        {message}
      </p>

      <button
        onClick={() => {
          setAnimateOut(true);
          setTimeout(onClose, 350);
        }}
        className="
          hover:bg-white/20 rounded p-1 transition-all 
          active:scale-90
        "
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
