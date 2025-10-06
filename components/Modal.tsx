import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-card dark:bg-slate-800 border border-border dark:border-slate-700 rounded-2xl shadow-2xl w-11/12 max-w-lg p-6 sm:p-8 transform transition-all duration-300 scale-95"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isOpen ? 'scale(1)' : 'scale(0.95)' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-card-foreground dark:text-slate-200">{title}</h3>
          <button onClick={onClose} className="text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-slate-200 text-3xl transition-colors">
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;