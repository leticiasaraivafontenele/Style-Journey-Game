import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';
import { useToast } from '../contexts/ToastContext';
import type { ToastType } from '../contexts/ToastContext';
import { toastStrings } from '../strings/pt-br/components';

const getToastColors = (type: ToastType) => {
  switch (type) {
    case 'success':
      return {
        bg: 'bg-green-100 dark:bg-green-800',
        border: 'border-green-500 dark:border-green-600',
        text: 'text-green-500 dark:text-green-200',
        icon: <HiCheck className="h-5 w-5" />,
      };
    case 'destructive':
      return {
        bg: 'bg-red-100 dark:bg-red-800',
        border: 'border-red-500 dark:border-red-600',
        text: 'text-red-500 dark:text-red-200',
        icon: <HiExclamation className="h-5 w-5" />,
      };
    case 'default':
    default:
      return {
        bg: 'bg-gray-100 dark:bg-gray-700',
        border: 'border-gray-400 dark:border-gray-600',
        text: 'text-gray-500 dark:text-gray-200',
        icon: <HiExclamation className="h-5 w-5" />,
      };
  }
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 left-4 z-50 space-y-4">
      {toasts.map((toast) => {
        const colors = getToastColors(toast.type);
        
        return (
          <div
            key={toast.id}
            className={`flex items-center w-full max-w-xs p-4 rounded-lg shadow ${colors.bg} border-l-4 ${colors.border}`}
            role="alert"
          >
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${colors.text}`}>
              {colors.icon}
            </div>
            <div className="ml-3 text-sm font-normal text-gray-900 dark:text-white">
              {toast.message}
            </div>
            <button
              type="button"
              className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 ${colors.text} hover:bg-gray-200 dark:hover:bg-gray-600`}
              onClick={() => removeToast(toast.id)}
              aria-label={toastStrings.closeAriaLabel}
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
