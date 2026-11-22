import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import QuickViewModal from '../components/QuickViewModal';
import { PRODUCTS, formatUSD } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ExternalLink, Check, Database, RefreshCw } from 'lucide-react';

export default function StorePage() {
  const { cartItems, addToCart, cartCount, cartTotal, setIsCartOpen, toastMessage } = useCart();
  const [products, setProducts] = useState(PRODUCTS);
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFromDatabase, setIsFromDatabase] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch products from Laravel MySQL Backend API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://127.0.0.1:8000/api/products');
      if (res.ok) {
        const data = await res.json();
        // Support array response or wrapped response { data: [...] }
        const productList = Array.isArray(data) ? data : data.data || [];
        if (productList.length > 0) {
          setProducts(productList);
          setIsFromDatabase(true);
        }
      }
    } catch {
      // Gracefully keeps initial clean products if Laravel server is offline
      setIsFromDatabase(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Dynamic categories from products
  const uniqueCategories = ['All', ...new Set(products.map((p) => {
    const cat = p.category?.category_name || p.category;
    return typeof cat === 'string' ? cat : 'General';
  }))];

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'All') return true;
    const catName = p.category?.category_name || (typeof p.category === 'string' ? p.category : '');
    return catName.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-slideUp">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 underline text-red-400 hover:text-red-300 font-bold"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Header */}
      <Header wishlistCount={wishlist.length} />

      {/* Clean Hero */}
      <section className="bg-white border-b border-slate-200/80 py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Modern Electronics
                </span>
                <span className="text-slate-300">•</span>
                <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isFromDatabase 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  <Database className="w-3 h-3" />
                  {isFromDatabase ? 'Connected to Laravel MySQL' : 'Local Fallback Ready'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                Designed for performance.
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed font-normal">
                Essential electronics with Bakong KHQR instant payment and nationwide delivery across Cambodia.
              </p>
            </div>

            {/* Refresh from API button */}
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync with Laravel API</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.product_id || product.id}
              product={product}
              onAddToCart={addToCart}
              isWishlisted={wishlist.includes(product.product_id || product.id)}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Bottom Cart Action Bar */}
        {cartCount > 0 && (
          <div className="mt-12 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
                </h4>
                <p className="text-xs text-slate-500">
                  Subtotal: <strong className="text-slate-900">{formatUSD(cartTotal)}</strong> • Standard & Express available
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => window.open('/checkout', '_blank')}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
              >
                <span>Checkout in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="px-3 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-medium rounded-xl transition-colors"
              >
                View Cart
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.product_id || quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200/80 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>© 2026 BakongStore. Minimal E-Commerce Practice.</div>
          <div className="flex items-center gap-4">
            <span>Standard & Express Delivery</span>
            <span>•</span>
            <span>Bakong KHQR</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
