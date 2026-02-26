import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white border border-cafe-200 rounded-2xl shadow-2xl overflow-hidden animate-modal-in">
        <div className="flex items-center justify-between p-4 border-b border-cafe-100">
          <h2 className="text-lg font-bold text-cafe-800 font-display">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-cafe-100 transition-colors text-cafe-500 hover:text-cafe-800"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
