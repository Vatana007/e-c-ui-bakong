import React, { useState } from 'react';
import { X, QrCode, CreditCard, Banknote, ShieldCheck, CheckCircle2, ArrowRight, Loader2, Smartphone } from 'lucide-react';
import { formatUSD, formatKHR } from '../data/products';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  orderTotals,
  onOrderPlaced
}) {
  const [formData, setFormData] = useState({
    fullName: 'Sokha Chan',
    phoneNumber: '+855 12 889 977',
    address: 'Street 2004, Sen Sok',
    city: 'Phnom Penh',
    notes: 'Please call before delivery'
  });

  const [paymentMethod, setPaymentMethod] = useState('bakong'); // 'bakong' | 'card' | 'cod'
  const [cardData, setCardData] = useState({
    cardNumber: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvv: '888'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasScannedBakong, setHasScannedBakong] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const orderId = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
      onOrderPlaced({
        orderId,
        items: cartItems,
        customer: formData,
        paymentMethod,
        totals: orderTotals,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6 animate-fadeIn">
        {/* Clean Modal Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Checkout</h2>
            <p className="text-xs text-slate-500 mt-0.5">Enter delivery details and complete your order.</p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Delivery Information */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Delivery Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Phone Number</label>
                <div className="relative">
                  <Smartphone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-medium mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House number, Street name, Sangkat..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">City / Province</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 outline-none transition font-medium bg-white text-slate-900"
                >
                  <option value="Phnom Penh">Phnom Penh</option>
                  <option value="Siem Reap">Siem Reap</option>
                  <option value="Battambang">Battambang</option>
                  <option value="Sihanoukville">Sihanoukville</option>
                  <option value="Kampot">Kampot</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Order Notes (Optional)</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 outline-none transition font-medium text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Bakong KHQR */}
              <button
                type="button"
                onClick={() => setPaymentMethod('bakong')}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  paymentMethod === 'bakong'
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="w-6 h-6 rounded-md bg-red-600 text-white flex items-center justify-center font-bold text-[10px]">
                    KH
                  </span>
                  <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700">
                    Instant
                  </span>
                </div>
                <div className="font-semibold text-xs text-slate-900">Bakong KHQR</div>
                <div className="text-[10px] text-slate-500">Scan with any bank</div>
              </button>

              {/* Credit Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'card'
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <CreditCard className="w-5 h-5 text-slate-700" />
                </div>
                <div className="font-semibold text-xs text-slate-900">Card</div>
                <div className="text-[10px] text-slate-500">Visa / Mastercard</div>
              </button>

              {/* Cash on Delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Banknote className="w-5 h-5 text-slate-700" />
                </div>
                <div className="font-semibold text-xs text-slate-900">Cash on Delivery</div>
                <div className="text-[10px] text-slate-500">Pay upon delivery</div>
              </button>
            </div>

            {/* Sub-panels for selected payment */}
            <div className="mt-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              {paymentMethod === 'bakong' && (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Bakong KHQR QR Code Card */}
                  <div className="bg-white p-3 rounded-xl shadow-xs border border-slate-200 flex flex-col items-center flex-shrink-0 w-36">
                    <div className="bg-red-600 text-white font-bold text-[9px] px-2.5 py-0.5 rounded mb-1.5 tracking-wider uppercase">
                      KHQR
                    </div>
                    <div className="relative w-28 h-28 bg-white p-1 rounded-lg flex items-center justify-center border border-slate-100">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=bakong://pay?merchant=BAKONGSTORE&amount=${orderTotals.grandTotal}`}
                        alt="Bakong KHQR"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded bg-red-600 text-white flex items-center justify-center font-bold text-[9px] shadow border-2 border-white">
                          KH
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-500 font-medium mt-1">
                      BAKONG STORE
                    </span>
                  </div>

                  <div className="text-xs space-y-2 flex-1">
                    <div className="text-slate-800 font-semibold">
                      Scan with any Cambodian mobile bank:
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Compatible with ABA, Wing, ACLEDA, Canadia & 50+ banking apps. Zero extra transfer fees.
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
                        {hasScannedBakong ? 'Simulated: Payment Verified' : 'Tap to Simulate Payment'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3 text-xs">
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

              {paymentMethod === 'cod' && (
                <div className="text-xs text-slate-600 flex items-start gap-2">
                  <Banknote className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  <p>
                    Pay cash or Bakong KHQR upon receiving your order at your doorstep.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Total & Order Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Total Amount</div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-slate-900">
                  {formatUSD(orderTotals.grandTotal)}
                </span>
                <span className="text-xs text-slate-400">
                  ≈ {formatKHR(orderTotals.grandTotal)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-70 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
