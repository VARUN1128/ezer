import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  href?: string;
  className?: string;
}

export const EzerLogo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  href = '/',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const logoContent = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Exact Stylized Folded Gold Ribbon Hexagon Monogram */}
      <div className={`${iconSizes[size]} relative flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(245,196,94,0.35)]"
        >
          {/* Upper folded ribbon loop */}
          <path
            d="M13.5 10.5L29 10.5C30.5 10.5 31.5 12 30.8 13.3L26.5 21C26 21.8 25.1 22.3 24.1 22.3L15.5 22.3C13.8 22.3 12.8 20.4 13.8 19L17.5 13.8C18 13.1 18.8 12.7 19.7 12.7L25 12.7"
            stroke="url(#ezerGoldGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Lower folded ribbon loop interlocking */}
          <path
            d="M26.5 29.5L11 29.5C9.5 29.5 8.5 28 9.2 26.7L13.5 19C14 18.2 14.9 17.7 15.9 17.7L24.5 17.7C26.2 17.7 27.2 19.6 26.2 21L22.5 26.2C22 26.9 21.2 27.3 20.3 27.3L15 27.3"
            stroke="url(#ezerGoldGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="ezerGoldGrad" x1="8" y1="10" x2="32" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBD77D" />
              <stop offset="0.5" stopColor="#F5C45E" />
              <stop offset="1" stopColor="#D99C32" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`${textSizes[size]} font-bold tracking-tight text-white font-sans flex items-center leading-none`}
        >
          Ezer
        </span>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-widest text-[#B8B5B0] font-medium mt-0.5">
            Know Before You Buy
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block outline-none">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
