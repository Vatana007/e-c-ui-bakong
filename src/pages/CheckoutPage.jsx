import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatUSD, formatKHR } from '../data/products';
import {
  ArrowLeft,
  Truck,
  Zap,
  CreditCard,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Loader2,
  ShoppingBag,
  Tag
} from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: 'Sokha Chan',
    phoneNumber: '+855 12 889 977',
    address: 'Street 2004, Sen Sok',
    city: 'Phnom Penh',
    notes: 'Please call before arrival'
  });

  // Delivery options: 'standard' | 'express'
  const [deliveryMethod, setDeliveryMethod] = useState('standard');

  // Payment method: 'bakong' | 'card' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState('bakong');
  const [cardData, setCardData] = useState({
    cardNumber: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvv: '888'
  });

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasScannedBakong, setHasScannedBakong] = useState(false);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Delivery costs
  const standardCost = subtotal > 100 || subtotal === 0 ? 0 : 2.0;
  const expressCost = 5.0;
  const shippingFee = deliveryMethod === 'express' ? expressCost : standardCost;
  
  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BAKONG10') {
      setDiscountPercent(10);
      setPromoMessage({ type: 'success', text: '10% Bakong discount applied!' });
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid code. Try "BAKONG10"' });
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const orderId = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderData = {
        orderId,
        items: cartItems,
        customer: formData,
        deliveryMethod,
        shippingFee,
        paymentMethod,
        totals: {
          subtotal,
          shippingFee,
          discountAmount,
          grandTotal
        },
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // Save order to session/local storage for receipt page
      sessionStorage.setItem('last_order', JSON.stringify(orderData));
      clearCart();
      navigate('/order-success');
    }, 1200);
  };

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-xs">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-1">Your cart is empty</h1>
        <p className="text-xs text-slate-500 max-w-sm mb-6">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <span className="font-extrabold text-lg tracking-tight text-slate-900">
              Bakong<span className="text-red-600">Store</span>
            </span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main 2-Column Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
              {/* 1. Delivery Address */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  1. Shipping Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition text-slate-900 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-medium mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="House number, Street name, Sangkat..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">City / Province</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 outline-none transition text-slate-900 font-medium bg-white"
                    >
                      <option value="Phnom Penh">Phnom Penh</option>
                      <option value="Siem Reap">Siem Reap</option>
                      <option value="Battambang">Battambang</option>
                      <option value="Sihanoukville">Sihanoukville</option>
                      <option value="Kampot">Kampot</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Delivery Notes (Optional)</label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 outline-none transition text-slate-900 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Extra Delivery Options (Standard vs Express) */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                  2. Delivery Method
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  Select your preferred shipping speed.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Standard Delivery */}
                  <label
                    onClick={() => setDeliveryMethod('standard')}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                      deliveryMethod === 'standard'
                        ? 'border-slate-900 bg-slate-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-slate-700" />
                          <span className="font-bold text-xs text-slate-900">Standard Delivery</span>
                        </div>
                        <span className="font-extrabold text-xs text-slate-900">
                          {standardCost === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatUSD(standardCost)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        2 - 3 business days nationwide across Cambodia.
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                      <span>Reliable postal & local courier</span>
                    </div>
                  </label>

                  {/* Express Delivery */}
                  <label
                    onClick={() => setDeliveryMethod('express')}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                      deliveryMethod === 'express'
                        ? 'border-slate-900 bg-slate-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="font-bold text-xs text-slate-900">Express Delivery</span>
                        </div>
                        <span className="font-extrabold text-xs text-slate-900">
                          {formatUSD(expressCost)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Same-day / Next-day priority dispatch with live rider tracking.
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 text-[10px] text-amber-600 font-semibold">
                      <span>⚡ Priority dispatch & SMS alert</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  3. Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {/* Bakong KHQR */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bakong')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'bakong'
                        ? 'border-slate-900 bg-slate-50/70 ring-1 ring-slate-900'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">
                        KH
                      </span>
                      <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                        Zero Fee
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-900">Bakong KHQR</div>
                    <div className="text-[10px] text-slate-500">Scan via banking app</div>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-slate-900 bg-slate-50/70 ring-1 ring-slate-900'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <CreditCard className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="font-bold text-xs text-slate-900">Credit Card</div>
                    <div className="text-[10px] text-slate-500">Visa / Mastercard</div>
                  </button>

                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-slate-900 bg-slate-50/70 ring-1 ring-slate-900'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Banknote className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="font-bold text-xs text-slate-900">Cash on Delivery</div>
                    <div className="text-[10px] text-slate-500">Pay at your doorstep</div>
                  </button>
                </div>

                {/* Subpanel for Bakong KHQR */}
                {paymentMethod === 'bakong' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-4">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center flex-shrink-0 w-36">
                      <div className="bg-red-600 text-white font-bold text-[9px] px-2.5 py-0.5 rounded mb-1.5 uppercase tracking-wider">
                        KHQR
                      </div>
                      <div className="relative w-28 h-28 bg-white p-1 rounded-lg border border-slate-100 flex items-center justify-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=bakong://pay?merchant=BAKONGSTORE&amount=${grandTotal.toFixed(2)}`}
                          alt="Bakong KHQR"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 rounded bg-red-600 text-white flex items-center justify-center font-bold text-[9px] shadow border border-white">
                            KH
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-500 font-medium mt-1">BAKONG STORE</span>
                    </div>

                    <div className="text-xs space-y-2 flex-1">
                      <div className="font-semibold text-slate-800">
                        Scan with your Cambodian mobile bank:
                      </div>
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        Open ABA Mobile, Wing, ACLEDA, Canadia, or any of 50+ Bakong member apps to complete your payment instantly.
                      </p>
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setHasScannedBakong(!hasScannedBakong)}
                          className={`text-[11px] font-medium px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                            hasScannedBakong
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${hasScannedBakong ? 'text-emerald-600' : 'text-slate-400'}`} />
                          {hasScannedBakong ? 'Simulated: Payment Verified' : 'Tap to Simulate Bank QR Scan'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Subpanel for Credit Card */}
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">Expires (MM/YY)</label>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Subpanel for COD */}
                {paymentMethod === 'cod' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2">
                    <Banknote className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                    <p>
                      You can pay in cash or scan the courier's Bakong KHQR code when your package arrives.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Order Summary ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>

              {/* Items List */}
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}`} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-11 h-11 rounded-lg object-cover bg-slate-50 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-slate-900 truncate">{item.name}</h4>
                        <p className="text-[11px] text-slate-400">
                          Qty {item.quantity} • {item.selectedColor}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 flex-shrink-0">
                      {formatUSD(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyPromo} className="pt-2 border-t border-slate-100 space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Coupon (e.g. BAKONG10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase font-semibold text-slate-800 placeholder:font-normal placeholder:capitalize focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] ${promoMessage.type === 'success' ? 'text-emerald-600 font-medium' : 'text-red-500'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Cost Calculations */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatUSD(subtotal)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <span>Delivery</span>
                    <span className="text-[10px] text-slate-400">({deliveryMethod === 'express' ? 'Express' : 'Standard'})</span>
                  </span>
                  <span className="font-semibold text-slate-900">
                    {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatUSD(shippingFee)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatUSD(discountAmount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-slate-900">Total</span>
                    <span className="text-[11px] text-slate-400 block font-normal">
                      ≈ {formatKHR(grandTotal)}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-slate-900">
                    {formatUSD(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order ({formatUSD(grandTotal)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bakong KHQR • 256-bit Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
