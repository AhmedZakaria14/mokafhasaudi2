'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackTitle?: string;
  fallbackCategory?: string;
  fallbackIcon?: React.ReactNode;
}

export default function SafeImage({
  src,
  alt,
  fallbackTitle,
  fallbackCategory,
  fallbackIcon,
  className = '',
  fill,
  width,
  height,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-emerald-950/90 via-slate-900 to-slate-950 border border-emerald-500/30 text-white ${
          fill ? 'absolute inset-0 w-full h-full' : ''
        } ${className}`}
        style={!fill && width && height ? { width, height } : undefined}
      >
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.4) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Decorative ambient glowing circles */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-[85%]">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 shadow-xl shadow-emerald-900/40 mb-3 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center text-emerald-400">
              {fallbackIcon || <ShieldCheck className="w-7 h-7" />}
            </div>
          </div>

          {fallbackCategory && (
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400/90 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 mb-1.5">
              {fallbackCategory}
            </span>
          )}

          <h4 className="text-sm md:text-base font-bold text-white leading-snug line-clamp-2">
            {fallbackTitle || alt || 'حصن المملكة - حلول مكافحة معتمدة'}
          </h4>

          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>معايير أمان معتمدة SFDA وبلدي</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-800/60 animate-pulse z-10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
