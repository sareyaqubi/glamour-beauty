import { useState, useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts, useCategories } from '../products/useProducts';
import ProductGrid from '../components/ProductGrid';
import { useSettings } from '../hooks/useSettings';

const beautyCategories = [
  'beauty', 'fragrances', 'skincare', 'hair-care',
  'makeup', 'nail-polish', 'hair-color', 'hair-spray',
];

function Home() {
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const activeCategory = searchParams.get('category') || '';

  const { data, isLoading, error, refetch } = useProducts({
    category: activeCategory || undefined,
    search: searchQuery || undefined,
    limit: 20,
  });

  const { data: categories } = useCategories();

  const handleCategoryClick = useCallback(
    (cat) => {
      const params = new URLSearchParams();
      if (cat && cat !== activeCategory) params.set('category', cat);
      setSearchParams(params);
      setSearchQuery('');
    },
    [activeCategory, setSearchParams]
  );

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      setSearchParams(params);
    },
    [searchQuery, setSearchParams]
  );

  const beautyCatList = useMemo(
    () =>
      categories?.filter((c) => typeof c === 'string' && beautyCategories.some((b) => c.includes(b) || c === b)) || [],
    [categories]
  );

  return (
    <div className="min-h-screen">
      <section className={`relative overflow-hidden ${
        isDark
          ? 'bg-gradient-to-b from-pink-500/8 via-transparent to-transparent'
          : 'bg-gradient-to-b from-pink-500/5 via-transparent to-transparent'
      }`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
              isDark ? 'bg-pink-500/10 text-pink-400' : 'bg-pink-500/10 text-pink-600'
            }`}>
              {settings.language === 'fa' ? 'مجموعه زیبایی لوکس' : 'Premium Beauty Collection'}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
              <span className="pink-gradient">
                {settings.language === 'fa' ? 'زیبایی' : 'Glow'}
              </span>{' '}
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                {settings.language === 'fa' ? 'واقعی تو را' : 'With Confidence'}
              </span>
            </h1>
            <p className={`text-base md:text-lg mb-8 max-w-lg mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {settings.language === 'fa'
                ? 'محصولات آرایشی و بهداشتی با کیفیت بالا برای زیبایی منحصر به فرد شما'
                : 'High-quality beauty and cosmetic products for your unique radiance.'}
            </p>

            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={settings.language === 'fa' ? 'جستجوی محصولات...' : 'Search products...'}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm outline-none transition-all ${
                    isDark
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-pink-500/40'
                      : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-pink-500/40 shadow-sm'
                  }`}
                />
                <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => handleCategoryClick('')}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  !activeCategory
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25'
                    : isDark
                    ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {settings.language === 'fa' ? 'همه' : 'All'}
              </button>
              {beautyCatList.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-semibold capitalize transition-all ${
                    activeCategory === cat
                      ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25'
                      : isDark
                      ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {searchQuery
              ? settings.language === 'fa' ? 'نتایج جستجو' : 'Search Results'
              : activeCategory
              ? activeCategory.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
              : settings.language === 'fa' ? 'همه محصولات' : 'All Products'}
          </h2>
          {data && (
            <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {data.total} {settings.language === 'fa' ? 'محصول' : 'products'}
            </span>
          )}
        </div>

        <ProductGrid
          products={data?.products}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />
      </section>
    </div>
  );
}

export default Home;
