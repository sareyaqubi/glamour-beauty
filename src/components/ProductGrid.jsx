import { memo } from 'react';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from './Skeleton';
import { ErrorFallback } from './Loader';
import { useSettings } from '../hooks/useSettings';

function ProductGrid({ products, isLoading, error, onRetry, emptyMessage }) {
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';

  if (isLoading) {
    return <ProductGridSkeleton isDark={isDark} />;
  }

  if (error) {
    return <ErrorFallback error={error} onRetry={onRetry} isDark={isDark} />;
  }

  if (!products || products.length === 0) {
    return (
      <div className={`text-center py-20 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <div className={`inline-flex p-4 rounded-full mb-4 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
          <svg className="w-12 h-12 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className={`text-base font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {emptyMessage || (settings.language === 'fa' ? 'محصولی یافت نشد' : 'No products found')}
        </p>
      </div>
    );
  }

  const isGrid = settings.layout === 'grid';

  return (
    <div
      className={
        isGrid
          ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'
          : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
      }
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 40}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default memo(ProductGrid);
