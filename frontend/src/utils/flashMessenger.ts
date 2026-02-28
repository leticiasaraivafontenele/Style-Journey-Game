import type { ToastType } from '../contexts/ToastContext';

let addToastCallback: ((type: ToastType, message: string) => void) | null = null;

export const setFlashMessengerCallback = (callback: (type: ToastType, message: string) => void) => {
  addToastCallback = callback;
};

export const flashMessenger = (type: ToastType, message: string) => {
  if (!addToastCallback) {
    console.error('flashMessenger não foi inicializado corretamente. Certifique-se de que o ToastProvider está montado.');
    return;
  }
  addToastCallback(type, message);
};
