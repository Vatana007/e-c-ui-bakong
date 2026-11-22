import React, { useState } from 'react';
import { ShoppingBag, Check, Heart, Star } from 'lucide-react';
import { formatUSD, formatKHR } from '../data/products';

export default function ProductCard({ product, onAddToCart, isWishlisted, onToggleWishlist, onQuickView }) {
  const [isAdded, setIsAdded] = useState(false);

  // Normalize fields between Laravel MySQL and local data
  const id = product.product_id || product.id;
  const name = product.product_name || product.name;
  const image = product.product_image || product.image;
  const description = product.product_description || product.description;
  const price = parseFloat(product.price);
  const categoryName = product.category?.category_name || (typeof product.category === 'string' ? product.category : 'General');
  const rating = product.rating || 4.9;
  const reviewsCount = product.reviewsCount || product.reviews_count || 128;
  const tag = product.tag || (price > 1000 ? 'Popular' : 'Featured');

  const normalizedProduct = {
    ...product,
    id,
    name,
    image,
    description,
    price,
    category: categoryName,
    rating,
    reviewsCount
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...normalizedProduct,
      selectedColor: product.colors?.[0]?.name || 'Standard',
      quantity: 1
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1400);
  };

  return (
    <div 
      onClick={() => onQuickView && onQuickView(normalizedProduct)}
      className="group bg-white rounded-2xl border border-slate-200/80 p-3 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Product Image Area */}
      <div>
        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-50 mb-3.5">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
          />

          {/* Minimal Tag */}
          {tag && (
            <div className="absolute top-2.5 left-2.5">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/95 text-slate-700 backdrop-blur-sm border border-slate-200/60 shadow-xs">
                {tag}
              </span>
            </div>
          )}

          {/* Wishlist Icon */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(id);
            }}
            aria-label="Wishlist"
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-rose-500 flex items-center justify-center shadow-xs transition-colors"
          >
            <Heart className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Content Area */}
        <div className="px-1">
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-medium tracking-wide uppercase">{categoryName}</span>
            <div className="flex items-center gap-1 text-slate-600 font-medium">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{rating}</span>
              <span className="text-slate-400 font-normal">({reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-slate-900 text-sm group-hover:text-slate-600 transition-colors line-clamp-1 mb-1">
            {name}
          </h3>

          {/* Short Human-written Description */}
          <p className="text-xs text-slate-500 line-clamp-1 font-normal mb-3">
            {description}
          </p>
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="px-1 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        {/* Price */}
        <div>
          <div className="text-base font-bold text-slate-900">
            {formatUSD(price)}
          </div>
          <span className="text-[10px] text-slate-400 block font-normal">
            ≈ {formatKHR(price)}
          </span>
        </div>

        {/* Clean Human Button */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={isAdded}
          className={`h-8 px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-150 active:scale-95 shrink-0 ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
