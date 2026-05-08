import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from './cartSlice';
import CartItem from './CartItem';
import { useSettings } from '../../hooks/useSettings';
import Button from '../../components/Button';
import toast from 'react-hot-toast';

function CartPage() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';

  const shipping = total >= 100 ? 0 : 9.99;
  const grandTotal = total + shipping;

  const handleClear = () => {
    dispatch(clearCart());
    toast.success(
      settings.language === 'fa' ? 'سبد خرید پاک شد' : 'Cart cleared'
    );
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className={`text-center py-20 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className={`inline-flex p-4 rounded-full mb-4 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
            <svg className="w-16 h-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </div>
          <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {settings.language === 'fa' ? 'سبد خرید خالی است' : 'Your cart is empty'}
          </h2>
          <p className="text-sm mb-6">
            {settings.language === 'fa'
              ? 'هنوز محصولی اضافه نکرده‌اید'
              : "You haven't added any items yet"}
          </p>
          <Link to="/">
            <Button variant="primary" size="lg" isDark={isDark}>
              {settings.language === 'fa' ? 'مشاهده محصولات' : 'Browse Products'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {settings.language === 'fa' ? 'سبد خرید' : 'Shopping Cart'}
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {items.length} {settings.language === 'fa' ? 'محصول' : 'items'}
          </p>
        </div>
        <Button
          variant="danger"
          size="md"
          isDark={isDark}
          onClick={handleClear}
        >
          {settings.language === 'fa' ? 'پاک کردن همه' : 'Clear All'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className={`p-6 rounded-3xl ${
              isDark ? 'glass' : 'bg-white shadow-md border border-pink-100'
            }`}>
              <h2 className={`text-lg font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {settings.language === 'fa' ? 'خلاصه خرید' : 'Order Summary'}
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {settings.language === 'fa' ? 'جمع جزء' : 'Subtotal'}
                  </span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {settings.language === 'fa' ? 'حمل و نقل' : 'Shipping'}
                  </span>
                  <span className={`font-medium ${
                    shipping === 0 ? 'text-green-400' : isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {total < 100 && (
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {settings.language === 'fa'
                      ? `$${(100 - total).toFixed(0)} دیگر برای ارسال رایگان`
                      : `Add $${(100 - total).toFixed(0)} more for free shipping`}
                  </p>
                )}

                <div className={`border-t pt-3 ${isDark ? 'border-white/10' : 'border-pink-100'}`}>
                  <div className="flex justify-between">
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {settings.language === 'fa' ? 'مجموع' : 'Total'}
                    </span>
                    <span className="text-lg font-bold pink-gradient">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button variant="primary" size="xl" isDark={isDark} className="w-full">
                  {settings.language === 'fa' ? 'پرداخت' : 'Checkout'}
                </Button>

                <Link to="/" className="block text-center">
                  <Button variant="ghost" size="md" isDark={isDark} className="w-full">
                    {settings.language === 'fa' ? 'ادامه خرید' : 'Continue Shopping'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
