import { useSettings } from '../hooks/useSettings';
import {
  SET_THEME,
  SET_LANGUAGE,
  SET_LAYOUT,
} from '../settings/settingsReducer';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';

const themeOptions = [
  { value: 'dark', icon: '🌙', label: { en: 'Dark Mode', fa: 'حالت تاریک' } },
  { value: 'light', icon: '☀️', label: { en: 'Light Mode', fa: 'حالت روشن' } },
];

const languageOptions = [
  { value: 'en', flag: '🇺🇸', label: { en: 'English', fa: 'انگلیسی' } },
  { value: 'fa', flag: '🇮🇷', label: { en: 'Persian (فارسی)', fa: 'فارسی' } },
];

const layoutOptions = [
  { value: 'grid', icon: '▦', label: { en: 'Grid View', fa: 'نمایش شبکه‌ای' } },
  { value: 'list', icon: '☰', label: { en: 'List View', fa: 'نمایش لیستی' } },
];

function Settings() {
  const { settings, dispatch } = useSettings();
  const reduxDispatch = useDispatch();
  const isDark = settings.theme === 'dark';

  const handleClearCart = () => {
    reduxDispatch(clearCart());
    toast.success(
      settings.language === 'fa' ? 'سبد خرید پاک شد' : 'Cart cleared'
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-fade-in">
      <div className="mb-8">
        <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {settings.language === 'fa' ? 'تنظیمات' : 'Settings'}
        </h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {settings.language === 'fa'
            ? 'مدیریت تنظیمات برنامه'
            : 'Manage your app preferences'}
        </p>
      </div>

      <div className="space-y-8">
        <SettingsSection
          title={settings.language === 'fa' ? 'پوسته' : 'Theme'}
          isDark={isDark}
        >
          <OptionGroup>
            {themeOptions.map((opt) => (
              <OptionButton
                key={opt.value}
                active={settings.theme === opt.value}
                onClick={() => dispatch({ type: SET_THEME, payload: opt.value })}
                isDark={isDark}
              >
                <span className="text-lg">{opt.icon}</span>
                <span>{settings.language === 'fa' ? opt.label.fa : opt.label.en}</span>
              </OptionButton>
            ))}
          </OptionGroup>
        </SettingsSection>

        <SettingsSection
          title={settings.language === 'fa' ? 'زبان' : 'Language'}
          isDark={isDark}
        >
          <OptionGroup>
            {languageOptions.map((opt) => (
              <OptionButton
                key={opt.value}
                active={settings.language === opt.value}
                onClick={() => dispatch({ type: SET_LANGUAGE, payload: opt.value })}
                isDark={isDark}
              >
                <span>{opt.flag}</span>
                <span>{opt.label.en}</span>
              </OptionButton>
            ))}
          </OptionGroup>
        </SettingsSection>

        <SettingsSection
          title={settings.language === 'fa' ? 'چیدمان' : 'Layout'}
          isDark={isDark}
        >
          <OptionGroup>
            {layoutOptions.map((opt) => (
              <OptionButton
                key={opt.value}
                active={settings.layout === opt.value}
                onClick={() => dispatch({ type: SET_LAYOUT, payload: opt.value })}
                isDark={isDark}
              >
                <span>{opt.icon}</span>
                <span>{settings.language === 'fa' ? opt.label.fa : opt.label.en}</span>
              </OptionButton>
            ))}
          </OptionGroup>
        </SettingsSection>

        <SettingsSection
          title={settings.language === 'fa' ? 'داده‌ها' : 'Data'}
          isDark={isDark}
        >
          <button
            onClick={handleClearCart}
            className={`w-full py-3 rounded-2xl text-sm font-semibold transition-all ${
              isDark
                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                : 'bg-red-50 text-red-500 hover:bg-red-100'
            }`}
          >
            {settings.language === 'fa' ? 'پاک کردن سبد خرید' : 'Clear Shopping Cart'}
          </button>
        </SettingsSection>
      </div>
    </div>
  );
}

function SettingsSection({ title, children, isDark }) {
  return (
    <div>
      <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
        isDark ? 'text-gray-500' : 'text-gray-400'
      }`}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function OptionGroup({ children }) {
  return <div className="flex flex-wrap gap-3">{children}</div>;
}

function OptionButton({ active, onClick, children, isDark }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
        active
          ? isDark
            ? 'bg-pink-500/15 text-pink-400 pink-border shadow-lg shadow-pink-500/10'
            : 'bg-pink-500/10 text-pink-600 pink-border'
          : isDark
          ? 'bg-white/5 text-gray-300 hover:bg-white/10'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

export default Settings;
