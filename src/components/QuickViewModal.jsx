import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, Heart, ShieldCheck, Truck } from 'lucide-react';
import { formatUSD, formatKHR } from '../data/products';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart, isWishlisted, onToggleWishlist }) {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedColor,
      quantity
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1400);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative animate-fadeIn my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Section */}
          <div className="relative aspect-square md:aspect-auto bg-slate-50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full max-h-72 object-contain mix-blend-multiply"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[11px] font-medium bg-white text-slate-700 border border-slate-200/80 shadow-xs">
                {product.tag}
              </span>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-1.5 pr-8">
                <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-slate-600 font-medium">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug mb-2">
                {product.fullName || product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">
                  {formatUSD(product.price)}
                </span>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  ≈ {formatKHR(product.price)}
                </span>
              </div>

              {/* Short Description (1 clean line) */}
              <p className="text-xs text-slate-500 leading-relaxed font-normal mb-4">
                {product.description}
              </p>

              {/* Specs Pills */}
              {product.specs && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-md"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              )}

              {/* Color Selection */}
              <div className="mb-4">
                <div className="text-xs text-slate-600 font-medium mb-2">
                  Color: <strong className="text-slate-900">{selectedColor}</strong>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        selectedColor === c.name
                          ? 'border-slate-900 ring-2 ring-slate-200 scale-110'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Trust Tag */}
              <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-slate-400" />
                  Free Delivery
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  1-Year Warranty
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
              {/* Quantity Counter */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50/80 p-0.5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors text-xs"
                >
                  -
                </button>
                <span className="w-7 text-center text-xs font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors text-xs"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={isAdded}
                className={`flex-1 h-10 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-98 ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({formatUSD(totalPrice)})</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'border-rose-200 bg-rose-50 text-rose-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
