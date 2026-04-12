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

interface PhaseBaseProps {
  backgroundImage: string;
  paperImage: string;
  phase: IPhase;
  children?: ReactNode;
  moduleName: string;
  backgroundClassname?: string;
  /** Called on every input keystroke with the current value. */
  onInputChange?: (value: string) => void;
  /**
   * Called with the current input value when the user clicks "Enviar".
   * Should return true if the answer is correct, false otherwise.
   */
  onEnviar?: (value: string) => boolean;
  /**
   * Called right after evaluation with the submitted selector and the result.
   * Useful for consumers that need to react to the submission (e.g. board highlighting).
   */
  onSubmit?: (selector: string, correct: boolean) => void;
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
}: PhaseBaseProps) {
  const { avatarId } = useAuth();
  const avatarImage = getAvatarImageById(avatarId);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [submitResult, setSubmitResult] = useState<SubmitResult>(null);

  function handleInputChange(value: string) {
    setInputValue(value);
    if (submitResult !== null) setSubmitResult(null);
    onInputChange?.(value);
  }

  function handleEnviar() {
    if (!onEnviar) return;
    const correct = onEnviar(inputValue);
    setSubmitResult(correct ? 'correct' : 'incorrect');
    onSubmit?.(inputValue, correct);
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
            />
          </section>

          {submitResult !== null && (
            <section className='mx-5 mb-1'>
              {isCorrect ? (
                <p className="text-sm font-semibold text-green-700 bg-green-100 border border-green-400 rounded-md px-3 py-2">
                  Correto! Você selecionou os elementos certos.
                </p>
              ) : (
                <p className="text-sm font-semibold text-red-700 bg-red-100 border border-red-400 rounded-md px-3 py-2">
                  Não foi dessa vez. Tente um seletor diferente!
                </p>
              )}
            </section>
          )}

          <section className='flex self-end gap-2 mr-5'>
            <button
              disabled
              className='bg-sky-800 opacity-40 cursor-not-allowed text-white text-xs font-start font-bold py-3 px-6 rounded-md'
            >
              Avaliar
            </button>
            {isCorrect ? (
              <button
                className='bg-green-700 hover:bg-green-600 text-white text-xs font-start font-bold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer'
              >
                Próxima Fase
              </button>
            ) : (
              <button
                onClick={handleEnviar}
                disabled={!hasInput}
                className='bg-yellow-600 hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-start font-bold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer'
              >
                Enviar
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
    </div>
  );
}
