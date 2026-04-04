import { wood3Image } from '../assets';

interface ModalConfirmProps {
  show: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ModalConfirm({
  show,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  isLoading = false,
}: ModalConfirmProps) {
  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30"
        style={{ zIndex: 200 }}
        onClick={onCancel}
      />
      <div
        className="fixed top-4 right-4 p-5 rounded-xl shadow-2xl min-w-64 max-w-80"
        style={{
          zIndex: 201,
          backgroundImage: `url(${wood3Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h3 className="text-lg font-cinzel font-bold text-amber-900 mb-1">{title}</h3>
        <p className="text-sm font-medium text-amber-800 mb-4">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-cinzel font-bold text-sm rounded-md transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-cinzel font-bold text-sm rounded-md transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Aguarde...' : confirmLabel}
          </button>
        </div>
      </div>
    </>
  );
}
