import { memo } from 'react';

function Loader({ size = 'md', isDark = true }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizes[size]} rounded-full border-2 ${
          isDark ? 'border-white/10 border-t-pink-500' : 'border-gray-200 border-t-pink-500'
        } animate-spin`}
      />
    </div>
  );
}

export function PageLoader({ isDark }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Loader size="lg" isDark={isDark} />
      <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Loading...
      </p>
    </div>
  );
}

export function ErrorFallback({ error, onRetry, isDark }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <div className={`p-4 rounded-full mb-4 ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
        <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Something went wrong
      </p>
      <p className={`text-sm mb-6 max-w-md ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {error?.message || 'An unexpected error occurred'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-2xl text-sm font-semibold bg-pink-500 text-white hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/25"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default memo(Loader);
