import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'footer';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  className = '',
  size = 'md'
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 30,
    md: 38,
    lg: 50
  };

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      {/* Royal Crest SVG Icon */}
      <div className="relative flex-shrink-0">
        <svg
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xs"
        >
          {/* Shield Outer */}
          <path
            d="M50 5L88 18V50C88 74 50 95 50 95C50 95 12 74 12 50V18L50 5Z"
            fill="url(#shieldGrad)"
            stroke="#D97706"
            strokeWidth="3"
          />
          {/* Inner Golden Border */}
          <path
            d="M50 12L80 23V48C80 68 50 86 50 86C50 86 20 68 20 48V23L50 12Z"
            fill="url(#innerGrad)"
            stroke="#FBBF24"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          {/* Central Palm & Protection Symbol */}
          <path
            d="M50 32V62M50 38C44 34 38 36 34 42M50 38C56 34 62 36 66 42M50 46C42 43 36 47 32 54M50 46C58 43 64 47 68 54M50 54C43 53 38 58 35 64M50 54C57 53 62 58 65 64"
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Certified Checkmark Ring */}
          <circle cx="50" cy="74" r="9" fill="#047857" stroke="#FBBF24" strokeWidth="1.5" />
          <path
            d="M46 74L49 77L55 70"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Shield Top Star */}
          <polygon
            points="50,15 52,21 58,21 53,24 55,30 50,26 45,30 47,24 42,21 48,21"
            fill="#FBBF24"
          />

          <defs>
            <linearGradient id="shieldGrad" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
              <stop stopColor="#064E3B" />
              <stop offset="0.6" stopColor="#065F46" />
              <stop offset="1" stopColor="#022C22" />
            </linearGradient>
            <linearGradient id="innerGrad" x1="50" y1="12" x2="50" y2="86" gradientUnits="userSpaceOnUse">
              <stop stopColor="#047857" />
              <stop offset="1" stopColor="#064E3B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text - Fully optimized for Mobile without overflowing */}
      <div className="flex flex-col text-right">
        <div className="flex items-center gap-1">
          <span
            className={`font-black tracking-tight leading-none ${
              isLight ? 'text-white' : 'text-slate-900'
            } text-base sm:text-lg md:text-xl whitespace-nowrap`}
          >
            حِـصـن المـمـلـكـة
          </span>
          <span className="hidden sm:inline-block bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-[9px] font-bold px-1.5 py-0.2 rounded-full whitespace-nowrap">
            SFDA
          </span>
        </div>
        <span
          className={`text-[9px] sm:text-[11px] font-medium leading-tight mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis ${
            isLight ? 'text-emerald-200' : 'text-emerald-700'
          }`}
        >
          مكافحة الحشرات والرش المعتمد
        </span>
      </div>
    </div>
  );
};
