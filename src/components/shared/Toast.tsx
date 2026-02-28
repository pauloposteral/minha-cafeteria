import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react';

interface ToastItem {
  id: string;
  message: string;
  type: 'xp' | 'review' | 'unlock' | 'prestige' | 'info';
  duration?: number;
}

interface ToastContextValue {
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

function XpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth="2" strokeLinecap="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#C8A951" opacity="0.15" />
    </svg>
  );
}

function CupIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B7B6B" strokeWidth="2" strokeLinecap="round">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" fill="#D4A574" opacity="0.1" />
    </svg>
  );
}

function TrophySmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth="2" strokeLinecap="round">
      <path d="M6 9H3a1 1 0 01-1-1V4a1 1 0 011-1h3" /><path d="M18 9h3a1 1 0 001-1V4a1 1 0 00-1-1h-3" />
      <path d="M6 3h12v6a6 6 0 01-12 0V3z" fill="#C8A951" opacity="0.15" />
    </svg>
  );
}

const ICONS: Record<string, JSX.Element> = {
  xp: <XpIcon />,
  review: <StarIcon />,
  unlock: <CupIcon />,
  prestige: <TrophySmallIcon />,
  info: <CupIcon />,
};

const BG_COLORS: Record<string, string> = {
  xp: 'bg-emerald-50 border-emerald-200',
  review: 'bg-yellow-50 border-yellow-200',
  unlock: 'bg-cafe-50 border-cafe-300',
  prestige: 'bg-amber-50 border-amber-200',
  info: 'bg-white border-cafe-200',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(prev => [...prev.slice(-2), { ...toast, id }]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-2 right-2 left-2 z-[60] flex flex-col items-center gap-1 pointer-events-none">
        {toasts.map(toast => (
          <ToastMessage key={toast.id} toast={toast} onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastMessage({ toast, onRemove }: { toast: ToastItem; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), toast.duration || 2500);
    return () => clearTimeout(timer);
  }, [toast.duration]);

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => onRemove(toast.id), 300);
      return () => clearTimeout(timer);
    }
  }, [visible, toast.id, onRemove]);

  return (
    <div className={`${visible ? 'animate-toast-in' : 'opacity-0 -translate-y-4 transition-all duration-300'} ${BG_COLORS[toast.type]} border rounded-lg px-3 py-2 shadow-md flex items-center gap-2 max-w-xs`}>
      {ICONS[toast.type]}
      <span className="text-xs text-cafe-700 font-medium">{toast.message}</span>
    </div>
  );
}
