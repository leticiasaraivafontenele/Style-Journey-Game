import { useState } from 'react';
import type { ReactNode } from 'react';
import type { IPhase } from '../../phases';
import { useAuth } from '../../contexts/AuthContext';
import { getAvatarImageById } from '../../utils/avatarHelper';
import { renderFormattedText } from '../../utils/formatTextCode';
import TerminalSimulator from '../TerminalSimulator';
import { TiArrowBackOutline } from 'react-icons/ti';
import { logoImage } from '../../assets';
import { useNavigate } from 'react-router';
import { usePhase } from '../../hooks/usePhase';
import StarRating, { qualityToRating } from '../StarRating';
import ModalEvaluation from '../modal/ModalEvaluation';
import type { ChallengeContext } from '../../services/levelService';

interface PhaseBaseProps {
  backgroundImage: string;
  paperImage: string;
  phase: IPhase;
  children?: ReactNode;
  moduleName: string;
  backgroundClassname?: string;
  onInputChange?: (value: string) => void;
  onEnviar?: (value: string) => boolean;
  onSubmit?: (selector: string, correct: boolean) => void;
  onNextPhase?: () => void;
  initialInputValue?: string;
  initiallyCorrect?: boolean;
  evaluationContext: ChallengeContext;
  initialQuality?: number | null;
  initialEvaluation?: string | null;
}

type SubmitResult = 'correct' | 'incorrect' | null;

export default function PhaseBase({
  backgroundImage,
  paperImage,
  phase,
  children,
  moduleName,
  backgroundClassname,
  onInputChange,
  onEnviar,
  onSubmit,
  onNextPhase,
  initialInputValue,
  initiallyCorrect,
  evaluationContext,
  initialQuality,
  initialEvaluation,
}: PhaseBaseProps) {
  const { avatarId } = useAuth();
  const avatarImage = getAvatarImageById(avatarId);
  const navigate = useNavigate();
  const { evaluatePhase } = usePhase();

  const [inputValue, setInputValue] = useState(initialInputValue ?? '');
  const [submitResult, setSubmitResult] = useState<SubmitResult>(initiallyCorrect ? 'correct' : null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [quality, setQuality] = useState<number | null>(initialQuality ?? null);
  const [evaluation, setEvaluation] = useState<string | null>(initialEvaluation ?? null);
  const [showEvalModal, setShowEvalModal] = useState(false);
  const [evalError, setEvalError] = useState<string | null>(null);

  function handleInputChange(value: string) {
    setInputValue(value);
    if (submitResult !== null) setSubmitResult(null);
    if (evalError !== null) setEvalError(null);
    onInputChange?.(value);
  }

  async function handleAvaliar() {
    if (!onEnviar || isEvaluating) return;

    setEvalError(null);
    const correct = onEnviar(inputValue);
    onSubmit?.(inputValue, correct);

    if (!correct) {
      setSubmitResult('incorrect');
      return;
    }

    setSubmitResult(null);
    setIsEvaluating(true);
    try {
      const result = await evaluatePhase(phase.id, inputValue, evaluationContext);
      setQuality(result.quality);
      setEvaluation(result.evaluation);
      setSubmitResult('correct');
      setShowEvalModal(true);
    } catch (err) {
      setEvalError(
        err instanceof Error ? err.message : 'Não foi possível avaliar sua resposta. Tente novamente.'
      );
    } finally {
      setIsEvaluating(false);
    }
  }

  const hasInput = inputValue.trim() !== '';
  const isCorrect = submitResult === 'correct';

  return (
    <div
      className={`relative min-h-screen w-full flex overflow-hidden ${backgroundClassname}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        id='paper'
        className="absolute top-0 -left-8 h-full"
        style={{
          width: '45%',
          backgroundImage: `url(${paperImage})`,
          backgroundSize: '105% 107%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <div id='content' className="relative w-[65%] h-full flex flex-col justify-between min-h-screen">
        <div className='flex flex-col'>
          <section className='flex w-full h-15 px-5 justify-between items-center'>
            <h1 className="text-sm font-start font-bold text-amber-900">
              {moduleName}
            </h1>
            {isCorrect && (
              <button
                type='button'
                title='Ver avaliação'
                onClick={() => setShowEvalModal(true)}
                className='shadow-lg bg-amber-900 rounded-sm px-2 py-1 cursor-pointer'
              >
                <StarRating rating={qualityToRating(quality)} />
              </button>
            )}
            <span className="text-base bg-sky-800 font-semibold rounded-sm px-2 text-white uppercase tracking-widest">
              Fase {phase.id}
            </span>
          </section>

          <section className='flex flex-col gap-2 my-5 mr-10 ml-7'>
            <div className='flex'>
              <div id="image-container" className="overflow-hidden flex-shrink-0">
                <img
                  src={avatarImage}
                  alt="Avatar"
                  className="h-25"
                />
              </div>
              <div id='title-container'>
                <p className='text-lg font-semibold'>
                  {renderFormattedText(phase.name)}
                </p>
                <div className='w-fit text-sm font-bold bg-lime-700 text-white rounded-xs uppercase py-1 px-2'>
                  {renderFormattedText(phase.property)}
                </div>
              </div>
            </div>

            <div id='description-container' className='flex flex-col gap-2'>
              <p className="text-sm">
                {renderFormattedText(phase.description)}
              </p>
              <p className="text-sm">
                <span className='font-semibold'>Objetivo:</span>{' '}
                {renderFormattedText(phase.instructions)}
              </p>
            </div>
          </section>

          <section id='terminal-container' className='p-5'>
            <TerminalSimulator
              title='css'
              afterString={phase.after}
              beforeString={phase.before}
              handleSetValue={handleInputChange}
              initialValue={initialInputValue}
            />
          </section>

          {(submitResult !== null || evalError !== null) && (
            <section className='mx-5 mb-1'>
              {evalError ? (
                <p className="text-sm font-semibold text-red-700 bg-red-100 border border-red-400 rounded-md px-3 py-2">
                  {evalError}
                </p>
              ) : isCorrect ? (
                <p className="text-sm font-semibold text-green-700 bg-green-100 border border-green-400 rounded-md px-3 py-2">
                  Correto! Veja a avaliação da sua solução.
                </p>
              ) : (
                <p className="text-sm font-semibold text-red-700 bg-red-100 border border-red-400 rounded-md px-3 py-2">
                  Não foi dessa vez. Tente um seletor diferente!
                </p>
              )}
            </section>
          )}

          <section className='flex self-end gap-2 mr-5'>
            {isCorrect ? (
              <button
                onClick={onNextPhase}
                className='bg-green-700 hover:bg-green-600 text-white text-xs font-start font-bold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer'
              >
                Próxima Fase
              </button>
            ) : (
              <button
                onClick={handleAvaliar}
                disabled={!hasInput || isEvaluating}
                className='bg-yellow-600 hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-start font-bold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer'
              >
                {isEvaluating ? 'Avaliando...' : 'Avaliar'}
              </button>
            )}
          </section>
        </div>

        <section className='flex justify-between justify-self-end gap-2 mr-7 ml-3'>
          <img
            src={logoImage}
            alt="logo"
            className="h-17"
          />
          <button
            title='Voltar ao Mapa'
            onClick={() => { navigate('/map'); }}
          >
            <TiArrowBackOutline
              className="text-amber-900 text-4xl cursor-pointer hover:text-amber-700 transition-colors duration-200"
            />
          </button>
        </section>
      </div>

      <div
        id='board-container'
        className="relative w-full flex flex-col h-full min-h-screen"
      >
        {children}
      </div>

      <ModalEvaluation
        show={showEvalModal}
        quality={quality}
        evaluation={evaluation}
        onClose={() => setShowEvalModal(false)}
      />
    </div>
  );
}
