import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  max?: number;
  size?: number;
}

export default function StarRating({ value, max = 5, size = 14 }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < value ? 'text-amber-400 fill-amber-400' : 'text-stone-600'}
        />
      ))}
    </div>
  );
}
