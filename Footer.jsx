import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../features/cart/cartSlice';

const footerLinks = [
  { path: '/', label: { en: 'Home', fa: 'خانه' } },
  { path: '/cart', label: { en: 'Cart', fa: 'سبد خرید' } },
  { path: '/settings', label: { en: 'Settings', fa: 'تنظیمات' } },
];

function Footer() {
  const { settings } = useSettings();
  const cartCount = useSelector(selectCartItemCount);
  const isDark = settings.theme === 'dark';

  return (
    <footer className={`border-t mt-20 ${isDark ? 'border-white/10' : 'border-pink-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-xl font-extrabold pink-gradient tracking-tight">
              Glamour
            </Link>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {settings.language === 'fa'
                ? 'زیبایی واقعی را کشف کنید'
                : 'Discover your true beauty.'}
            </p>
          </div>

          <div>
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {settings.language === 'fa' ? 'لینک‌ها' : 'Links'}
            </h4>
            <div className="space-y-2">
              {footerLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`block text-sm transition-colors ${
                    isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  {settings.language === 'fa' ? l.label.fa : l.label.en}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {settings.language === 'fa' ? 'دسته‌بندی‌ها' : 'Shop'}
            </h4>
            <div className="space-y-2">
              {['beauty', 'fragrances', 'skincare', 'hair-care'].map((cat) => (
                <Link
                  key={cat}
                  to={`/?category=${cat}`}
                  className={`block text-sm capitalize transition-colors ${
                    isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  {cat.replace('-', ' ')}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {settings.language === 'fa' ? 'اطلاعات' : 'Info'}
            </h4>
            <div className={`text-sm space-y-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              <p>{cartCount} {settings.language === 'fa' ? 'مورد در سبد خرید' : 'items in cart'}</p>
              <p>{settings.language === 'fa' ? 'تم:' : 'Theme:'} {settings.theme === 'dark' ? 'Dark' : 'Light'}</p>
            </div>
          </div>
        </div>

        <div className={`border-t mt-8 pt-8 text-center text-sm ${
          isDark ? 'border-white/10 text-gray-500' : 'border-pink-100 text-gray-400'
        }`}>
          <p>&copy; {new Date().getFullYear()} Glamour Beauty Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
