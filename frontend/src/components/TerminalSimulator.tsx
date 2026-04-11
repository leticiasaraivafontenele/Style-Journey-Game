import { useState } from 'react';
import { renderFormattedText } from '../utils/formatTextCode';

interface TerminalSimulatorProps {
  title: string;
  beforeString?: string;
  afterString?: string;
  handleSetValue?: (value: string) => void;
  inputClassName?: string;
}

export default function TerminalSimulator({ title, beforeString, afterString, handleSetValue, inputClassName }: TerminalSimulatorProps) {
  const [inputValue, setInputValue] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    handleSetValue?.(value);
  }

  return (
    <div className="rounded-md overflow-hidden shadow-lg font-mono w-full text-sm">
      <div className="flex items-center gap-2 bg-amber-900 px-3 py-1">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-gray-200 tracking-wide">{title}</span>
      </div>

      <div className="bg-red-950 text-white px-5 py-2 min-h-24 flex flex-col gap-1">
        {beforeString && (
          <p className="leading-5 whitespace-pre-wrap">
            {renderFormattedText(beforeString)}
          </p>
        )}

        {handleSetValue && (() => {
          const afterLines = afterString ? afterString.split(/\/n|\n/) : [];
          const firstAfterLine = afterLines[0] ?? '';
          const remainingAfterLines = afterLines.slice(1).join('\n');

          return (
            <>
              <div className='flex'>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  className={`bg-transparent border-1 border-white rounded-sm text-white h-4 min-w-10 ${inputClassName}`}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                />
                {firstAfterLine && (
                  <span className="text-white leading-5">
                    {renderFormattedText(firstAfterLine)}
                  </span>
                )}
              </div>
              {remainingAfterLines && (
                <p className="leading-5 whitespace-pre-wrap">
                  {renderFormattedText(remainingAfterLines)}
                </p>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
}
