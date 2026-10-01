import { wood3Image } from '../../assets';
import { modalEvaluationStrings } from '../../strings/pt-br/components';
import StarRating, { qualityToRating } from '../StarRating';

interface ModalEvaluationProps {
  show: boolean;
  quality: number | null;
  evaluation: string | null;
  onClose: () => void;
}

export default function ModalEvaluation({
  show,
  quality,
  evaluation,
  onClose,
}: ModalEvaluationProps) {
  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40"
        style={{ zIndex: 200 }}
        onClick={onClose}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-16 pt-16 pb-8 rounded-xl flex flex-col items-center gap-4"
        style={{
          zIndex: 201,
          backgroundImage: `url(${wood3Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minWidth: '380px',
          maxWidth: '460px',
          minHeight: '300px',
        }}
      >
        <h3 className="text-xl font-start font-bold text-white drop-shadow">
          {modalEvaluationStrings.title}
        </h3>

        <div className="bg-amber-900/80 rounded-md px-3 py-2">
          <StarRating rating={qualityToRating(quality)} />
        </div>

        {evaluation && (
          <p className="text-base font-medium text-black text-center bg-yellow-700/30 rounded-md p-3">
            {evaluation}
          </p>
        )}

        <button
          onClick={onClose}
          className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-start font-bold text-xs rounded-md transition-colors duration-200 cursor-pointer"
        >
          {modalEvaluationStrings.continueLabel}
        </button>
      </div>
    </>
  );
}
