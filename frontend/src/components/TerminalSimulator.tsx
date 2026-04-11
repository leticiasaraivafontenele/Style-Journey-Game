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
    <div className="rounded-md overflow-hidden shadow-lg font-mono text-sm w-full">
      <div className="flex items-center gap-2 bg-amber-900 px-4 py-1">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-gray-200 text-sm tracking-wide">{title}</span>
      </div>

      <div className="bg-red-950 text-white px-5 py-4 min-h-24 flex flex-col gap-1">
        {beforeString && (
          <p className="leading-relaxed whitespace-pre-wrap">
            {renderFormattedText(beforeString)}
          </p>
        )}

        {handleSetValue && (
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
            {afterString && (
              <span className="text-white leading-relaxed whitespace-pre-wrap">
                {renderFormattedText(afterString)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
