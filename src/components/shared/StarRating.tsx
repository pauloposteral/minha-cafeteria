interface StarRatingProps {
  value: number;
  max?: number;
  size?: number;
}

function CafeStar({ filled, size }: { filled: boolean; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L14.9 8.62L22 9.27L16.5 14.14L18.18 21.02L12 17.27L5.82 21.02L7.5 14.14L2 9.27L9.1 8.62L12 2Z"
        fill={filled ? '#C8A951' : '#E8D9CB'}
        stroke={filled ? '#B8952F' : '#D4C4B0'}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {filled && (
        <path
          d="M12 2L14.9 8.62L22 9.27L16.5 14.14L18.18 21.02L12 17.27L5.82 21.02L7.5 14.14L2 9.27L9.1 8.62L12 2Z"
          fill="url(#starGrad)"
          opacity="0.3"
        />
      )}
      <defs>
        <linearGradient id="starGrad" x1="2" y1="2" x2="22" y2="22">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#C8A951" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function StarRating({ value, max = 5, size = 14 }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <CafeStar key={i} filled={i < value} size={size} />
      ))}
    </div>
  );
}
