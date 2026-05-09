import { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../features/cart/cartSlice';
import { useSettings } from '../hooks/useSettings';
import { TOGGLE_THEME } from '../settings/settingsReducer';

const links = [
  { path: '/', label: { en: 'Home', fa: 'خانه' } },
  { path: '/cart', label: { en: 'Cart', fa: 'سبد خرید' } },
  { path: '/settings', label: { en: 'Settings', fa: 'تنظیمات' } },
];

function Navbar() {
  const { pathname } = useLocation();
  const cartCount = useSelector(selectCartItemCount);
  const { settings, dispatch } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDark = settings.theme === 'dark';
  const isRtl = settings.language === 'fa';

  return (
    <nav
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`fixed top-0 left-0 right-0 z-50 h-16 ${
        isDark ? 'glass' : 'glass-light shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl sm:text-2xl font-extrabold pink-gradient tracking-tight">
              Glamour
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  pathname === link.path
                    ? isDark
                      ? 'bg-pink-500/15 text-pink-400 pink-border'
                      : 'bg-pink-500/10 text-pink-600 pink-border'
                    : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {settings.language === 'fa' ? link.label.fa : link.label.en}
                {link.path === '/cart' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 flex items-center justify-center text-[10px] font-bold rounded-full bg-pink-500 text-white shadow-lg shadow-pink-500/30">
                    {cartCount}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch({ type: TOGGLE_THEME })}
              className={`p-2.5 rounded-2xl transition-all duration-200 ${
                isDark
                  ? 'text-gray-400 hover:text-white hover:bg-white/5'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2.5 rounded-2xl ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className={`md:hidden border-t ${isDark ? 'border-white/10' : 'border-pink-200/50'} ${isDark ? 'glass' : 'glass-light'}`}>
          <div className="px-4 py-2 space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  pathname === link.path
                    ? isDark
                      ? 'bg-pink-500/15 text-pink-400'
                      : 'bg-pink-500/10 text-pink-600'
                    : isDark
                    ? 'text-gray-400 hover:bg-white/5'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {settings.language === 'fa' ? link.label.fa : link.label.en}
                {link.path === '/cart' && cartCount > 0 && (
                  <span className="min-w-[20px] h-5 px-1 flex items-center justify-center text-[10px] font-bold rounded-full bg-pink-500 text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default memo(Navbar);
