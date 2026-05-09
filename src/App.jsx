import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CartPage from './features/cart/CartPage';
import Settings from './pages/Settings';
import { useSettings } from './hooks/useSettings';

export default function App() {
  const { settings } = useSettings();
  const isRtl = settings.language === 'fa';
  const isDark = settings.theme === 'dark';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-dark-bg text-white' : 'bg-white text-gray-900'
      }`}
    >
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
