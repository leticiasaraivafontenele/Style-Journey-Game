import { FaRegStar, FaStar } from 'react-icons/fa';

type StarRatingValue = 'perfect' | 'ok' | 'bad';

interface StarRatingProps {
  rating?: StarRatingValue;
  className?: string;
}

const STAR_COUNT = 3;

const filledCountByRating: Record<StarRatingValue, number> = {
  bad: 1,
  ok: 2,
  perfect: 3,
};

export function qualityToRating(quality?: number | null): StarRatingValue {
  if (quality === 1) return 'bad';
  if (quality === 2) return 'ok';
  return 'perfect';
}

export default function StarRating({ rating, className }: StarRatingProps) {
  const filledCount = rating ? filledCountByRating[rating] : 0;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: STAR_COUNT }, (_, i) => {
        const isFilled = i < filledCount;
        if (isFilled) {
          return (
            <FaStar
              key={i}
              size={32}
              className='text-yellow-300'
          />)
        }
        return (
          <FaRegStar
              key={i}
              size={32}
              className='text-white'
            />
          );
        })}
    </div>
  );
}
