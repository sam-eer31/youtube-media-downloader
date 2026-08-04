'use client';

import React from 'react';
import { Toast as ToastType } from '@/hooks/useToast';

const icons: Record<string, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

const colors: Record<string, string> = {
  success: 'border-emerald-500/30 bg-emerald-500/10',
  error: 'border-red-500/30 bg-red-500/10',
  info: 'border-violet-500/30 bg-violet-500/10',
};

const iconColors: Record<string, string> = {
  success: 'text-emerald-400',
  error: 'text-red-400',
  info: 'text-violet-400',
};

interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-enter glass ${colors[toast.type]} border p-4 rounded-xl flex items-start gap-3 shadow-2xl`}
        >
          <span className={`text-lg font-bold ${iconColors[toast.type]} mt-0.5`}>
            {icons[toast.type]}
          </span>
          <p className="text-sm text-foreground flex-1">{toast.message}</p>
          <button
            onClick={() => onRemove(toast.id)}
            className="text-muted hover:text-foreground transition-colors text-sm"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
