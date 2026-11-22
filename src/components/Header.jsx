import React from 'react';
import { ShoppingBag, ShieldCheck, QrCode, Heart, ExternalLink } from 'lucide-react';
import { formatUSD } from '../data/products';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Header({ wishlistCount = 0 }) {
  const { cartCount, cartTotal, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white text-xs font-normal py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] text-slate-300">
              Instant <strong>Bakong KHQR</strong> & Card Checkout with Standard or Express delivery.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
            <span>Free Delivery over $100</span>
            <span>•</span>
            <span>Official Warranty</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            BK
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Bakong<span className="text-red-600">Store</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-50 text-red-700">
              KHQR
            </span>
          </div>
        </Link>

        {/* Feature Highlights */}
        <div className="hidden md:flex items-center gap-5 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            100% Genuine
          </span>
          <span className="flex items-center gap-1">
            <QrCode className="w-3.5 h-3.5 text-red-600" />
            Bakong KHQR
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Wishlist Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-600 bg-slate-50 border border-slate-200/80 text-xs font-semibold">
            <Heart className={`w-3.5 h-3.5 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
            <span>{wishlistCount}</span>
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-bold">{formatUSD(cartTotal)}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
