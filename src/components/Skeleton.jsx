import { memo } from 'react';

function Skeleton({ className = '', variant = 'default' }) {
  const base = variant === 'light' ? 'skeleton-pulse-light' : 'skeleton-pulse';
  return <div className={`${base} ${className}`} />;
}

export function ProductCardSkeleton({ isDark }) {
  return (
    <div className={`rounded-3xl overflow-hidden ${isDark ? 'glass' : 'bg-white shadow-md'}`}>
      <div className="aspect-square skeleton-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-3 skeleton-pulse w-1/3" />
        <div className="h-4 skeleton-pulse w-3/4" />
        <div className="h-3 skeleton-pulse w-1/2" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-6 skeleton-pulse w-16" />
          <div className="h-9 skeleton-pulse w-20 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, isDark }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} isDark={isDark} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton({ isDark }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      <div className={`aspect-square rounded-3xl overflow-hidden ${isDark ? 'glass' : 'bg-white shadow-md'}`}>
        <div className="w-full h-full skeleton-pulse" />
      </div>
      <div className="space-y-4">
        <div className="h-4 skeleton-pulse w-1/4" />
        <div className="h-8 skeleton-pulse w-3/4" />
        <div className="h-4 skeleton-pulse w-1/3" />
        <div className="h-6 skeleton-pulse w-1/4" />
        <div className="h-24 skeleton-pulse w-full" />
        <div className="h-14 skeleton-pulse w-48 rounded-2xl" />
      </div>
    </div>
  );
}

export default memo(Skeleton);
