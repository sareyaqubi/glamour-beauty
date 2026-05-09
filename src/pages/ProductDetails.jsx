import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useProduct } from '../products/useProducts';
import { addToCart, selectCartItems } from '../features/cart/cartSlice';
import { useSettings } from '../hooks/useSettings';
import { ProductDetailSkeleton } from '../components/Skeleton';
import { ErrorFallback } from '../components/Loader';
import Button from '../components/Button';
import toast from 'react-hot-toast';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { settings } = useSettings();
  const isDark = settings.theme === 'dark';
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading, error, refetch } = useProduct(id);

  const inCart = cartItems.some((item) => item.id === Number(id));

  const handleAdd = useCallback(() => {
    if (!product) return;
    dispatch(addToCart(product));
    toast.success(
      settings.language === 'fa'
        ? `${product.title} به سبد خرید اضافه شد`
        : `${product.title} added to cart`
    );
  }, [dispatch, product, settings.language]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <ProductDetailSkeleton isDark={isDark} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <ErrorFallback error={error} onRetry={refetch} isDark={isDark} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {settings.language === 'fa' ? 'محصول یافت نشد' : 'Product not found'}
        </p>
        <Link to="/" className="text-pink-500 mt-4 inline-block font-semibold">
          &larr; {settings.language === 'fa' ? 'بازگشت به خانه' : 'Back to home'}
        </Link>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-fade-in">
      <Link
        to="/"
        className={`inline-flex items-center gap-1 text-sm font-medium mb-6 transition-colors ${
          isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        &larr; {settings.language === 'fa' ? 'بازگشت' : 'Back'}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className={`aspect-square rounded-3xl overflow-hidden ${
            isDark ? 'glass' : 'bg-white shadow-md'
          }`}>
            <img
              src={images[selectedImage] || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`shrink-0 w-16 h-16 rounded-2xl overflow-hidden transition-all duration-200 ${
                    selectedImage === i
                      ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-transparent'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
            isDark ? 'text-pink-400/60' : 'text-pink-500'
          }`}>
            {product.brand || product.category}
          </p>

          <h1 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-pink-500' : isDark ? 'text-gray-600' : 'text-gray-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {product.rating} / 5
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {product.stock > 0
                ? settings.language === 'fa'
                  ? `${product.stock} عدد در انبار`
                  : `${product.stock} in stock`
                : settings.language === 'fa' ? 'ناموجود' : 'Out of stock'}
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl md:text-4xl font-bold pink-gradient">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className={`text-lg line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-xl bg-pink-500/15 text-pink-400">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className={`text-sm leading-relaxed mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button
              variant={inCart ? 'success' : 'primary'}
              size="xl"
              isDark={isDark}
              onClick={handleAdd}
              disabled={product.stock === 0}
            >
              {inCart
                ? settings.language === 'fa' ? '✓ اضافه شده' : '✓ Added to Cart'
                : product.stock === 0
                ? settings.language === 'fa' ? 'ناموجود' : 'Out of Stock'
                : settings.language === 'fa' ? 'افزودن به سبد خرید' : 'Add to Cart'}
            </Button>
            <Link to="/cart">
              <Button
                variant="secondary"
                size="xl"
                isDark={isDark}
              >
                {settings.language === 'fa' ? 'مشاهده سبد خرید' : 'View Cart'}
              </Button>
            </Link>
          </div>

          <div className={`pt-6 border-t ${isDark ? 'border-white/10' : 'border-pink-100'}`}>
            <dl className="grid grid-cols-2 gap-4">
              {[
                { label: { en: 'Category', fa: 'دسته‌بندی' }, value: product.category },
                { label: { en: 'Brand', fa: 'برند' }, value: product.brand || '-' },
                { label: { en: 'SKU', fa: 'کد محصول' }, value: product.sku || '-' },
                { label: { en: 'Weight', fa: 'وزن' }, value: product.weight ? `${product.weight}g` : '-' },
              ].map(({ label, value }) => (
                <div key={label.en}>
                  <dt className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {settings.language === 'fa' ? label.fa : label.en}
                  </dt>
                  <dd className={`text-sm font-medium mt-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
