export function renderFormattedText(text: string) {
  if (!text) return null;

  const lines = text.split(/\/n|\n/);

  return lines.map((line, lineIndex) => {
    const parts = line.split(/(##[^#]+##)/g);

    return (
      <span key={lineIndex}>
        {lineIndex > 0 && <br />}
        {parts.map((part, partIndex) => {
          if (part.startsWith('##') && part.endsWith('##')) {
            return (
              <span key={partIndex} className="bg-yellow-600 text-white font-semibold px-1 rounded-sm">
                {part.slice(2, -2)}
              </span>
            );
          }
          return <span key={partIndex}>{part}</span>;
        })}
      </span>
    );
  });
}
