import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from './cartSlice';
import { useSettings } from '../../hooks/useSettings';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const [imgError, setImgError] = useState(false);

  const handleRemove = useCallback(() => {
    dispatch(removeFromCart(item.id));
    toast.success(
      settings.language === 'fa'
        ? `${item.title} حذف شد`
        : `${item.title.slice(0, 20)}... removed`
    );
  }, [dispatch, item.id, item.title, settings.language]);

  return (
    <div className={`flex gap-4 p-4 rounded-3xl ${
      isDark ? 'glass' : 'bg-white shadow-sm border border-pink-100'
    }`}>
      <Link to={`/products/${item.id}`} className="shrink-0">
        <img
          src={imgError ? 'https://placehold.co/120x120/fce8f0/FF2D95?text=Glamour' : item.thumbnail}
          alt={item.title}
          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-2xl"
          onError={() => setImgError(true)}
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/products/${item.id}`}>
          <h3 className={`font-semibold text-sm md:text-base truncate ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {item.title}
          </h3>
        </Link>
        <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          ${item.price.toFixed(2)} {settings.language === 'fa' ? 'هر عدد' : 'each'}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(decreaseQuantity(item.id))}
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${
                isDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className={`font-semibold w-8 text-center ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {item.quantity}
            </span>
            <button
              onClick={() => dispatch(increaseQuantity(item.id))}
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold transition-all ${
                isDark
                  ? 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30'
                  : 'bg-pink-500/10 text-pink-600 hover:bg-pink-500/20'
              }`}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold pink-gradient text-sm md:text-base">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={handleRemove}
              className={`p-1.5 rounded-xl transition-all ${
                isDark
                  ? 'text-gray-500 hover:text-red-400 hover:bg-red-500/10'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              aria-label="Remove item"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CartItem);
