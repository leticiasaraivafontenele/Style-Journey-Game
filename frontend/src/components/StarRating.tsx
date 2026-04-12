import { FaRegStar, FaStar } from 'react-icons/fa';

type StarRatingValue = 'perfect' | 'ok' | 'bad';

interface StarRatingProps {
  rating?: StarRatingValue;
}

const STAR_COUNT = 3;

const filledCountByRating: Record<StarRatingValue, number> = {
  bad: 1,
  ok: 2,
  perfect: 3,
};

export default function StarRating({ rating }: StarRatingProps) {
  const filledCount = rating ? filledCountByRating[rating] : 0;

  return (
    <div className="flex items-center gap-1 shadow-lg bg-amber-900 rounded-sm px-2 py-1">
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
