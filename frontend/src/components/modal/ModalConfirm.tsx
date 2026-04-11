import { wood3Image } from '../../assets';
import { modalConfirmStrings } from '../../strings/pt-br/components';

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
  confirmLabel = modalConfirmStrings.defaultConfirmLabel,
  cancelLabel = modalConfirmStrings.defaultCancelLabel,
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
        className="fixed top-4 right-4 px-20 pt-17 pb-8 rounded-xl min-w-64 max-w-80 flex flex-col justify-around items-start gap-1"
        style={{
          zIndex: 201,
          backgroundImage: `url(${wood3Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minWidth: '350px',
          minHeight: '320px',
        }}
      >
        <div className='bg-yellow-700/30 rounded-md p-1'>
          <h3 className="text-xl font-cinzel font-bold text-black mb-1">{title}</h3>
          <p className="text-base font-medium text-black mb-4">{message}</p>          
        </div>

        <div className="flex gap-3 justify-end self-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-cinzel font-bold text-sm rounded-md transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-800 hover:bg-red-900 text-white font-cinzel font-bold text-sm rounded-md transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? modalConfirmStrings.loadingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </>
  );
}
