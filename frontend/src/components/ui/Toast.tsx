'use client';

import React from 'react';
import { Toast as ToastType } from '@/hooks/useToast';

const iconSvgs: Record<string, React.ReactNode> = {
  success: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  info: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

const borderColors: Record<string, string> = {
  success: 'border-l-success',
  error: 'border-l-error',
  info: 'border-l-accent',
};

const iconStyles: Record<string, React.CSSProperties> = {
  success: {
    background: 'rgba(77, 154, 62, 0.15)',
    color: 'var(--success)',
    boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.2)',
  },
  error: {
    background: 'rgba(201, 64, 64, 0.15)',
    color: 'var(--error)',
    boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.2)',
  },
  info: {
    background: 'rgba(102, 187, 106, 0.15)',
    color: 'var(--accent)',
    boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.2)',
  },
};

interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3 max-w-sm">
      {toasts.map((toast, i) => (
        <div
          key={toast.id}
          className={`toast-enter clay ${borderColors[toast.type]} border-l-[4px] p-4 rounded-xl flex items-start gap-3`}
          style={{ transform: `translateY(${i * 2}px)` }}
        >
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={iconStyles[toast.type]}>
            {iconSvgs[toast.type]}
          </div>
          <p className="text-sm text-foreground flex-1 leading-relaxed">{toast.message}</p>
          <button
            onClick={() => onRemove(toast.id)}
            className="text-muted/50 hover:text-foreground transition-colors text-sm flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-surface"
            aria-label="Dismiss notification"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
