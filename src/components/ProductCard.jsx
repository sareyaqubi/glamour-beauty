import { memo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems } from '../features/cart/cartSlice';
import { useSettings } from '../hooks/useSettings';
import toast from 'react-hot-toast';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);

  const inCart = cartItems.some((item) => item.id === product.id);

  const handleAdd = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAdding(true);
      dispatch(addToCart(product));
      toast.success(
        settings.language === 'fa'
          ? `${product.title} به سبد خرید اضافه شد`
          : `${product.title.slice(0, 25)}... added`
      );
      setTimeout(() => setAdding(false), 300);
    },
    [dispatch, product, settings.language]
  );

  return (
    <Link
      to={`/products/${product.id}`}
      className={`group block rounded-3xl overflow-hidden card-hover ${
        isDark
          ? 'glass hover:bg-dark-cardHover'
          : 'bg-white shadow-md hover:shadow-xl border border-pink-100'
      }`}
    >
      <div className={`relative aspect-square overflow-hidden ${
        isDark ? 'bg-dark-card' : 'bg-pink-50'
      }`}>
        <img
          src={imgError ? 'https://placehold.co/400x400/fce8f0/FF2D95?text=Glamour' : product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-xl bg-pink-500 text-white shadow-lg">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <div className="p-4">
        <p className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${
          isDark ? 'text-pink-400/60' : 'text-pink-500'
        }`}>
          {product.brand || product.category}
        </p>

        <h3 className={`font-semibold text-sm leading-tight mb-1.5 line-clamp-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${i < Math.round(product.rating) ? 'text-pink-500' : isDark ? 'text-gray-600' : 'text-gray-200'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className={`text-[11px] ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            ({product.rating})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold pink-gradient">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className={`text-[11px] line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                ${(product.price * (1 + product.discountPercentage / 100)).toFixed(0)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={adding}
            className={`px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all duration-200 ${
              inCart
                ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                : isDark
                ? 'bg-pink-500/15 text-pink-400 pink-border hover:bg-pink-500/25'
                : 'bg-pink-500/10 text-pink-600 pink-border hover:bg-pink-500/20'
            } ${adding ? 'scale-90' : ''}`}
          >
            {inCart ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
