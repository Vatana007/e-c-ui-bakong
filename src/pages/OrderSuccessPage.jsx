import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Package, ArrowRight, Printer, Truck, Zap, ShieldCheck } from 'lucide-react';
import { formatUSD, formatKHR } from '../data/products';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('last_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-center">
        <h1 className="text-xl font-bold text-slate-900 mb-2">No recent order found</h1>
        <p className="text-xs text-slate-500 mb-6">Return to store to explore products.</p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-8 text-center border-b border-slate-100">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <Check className="w-7 h-7 stroke-[2.5]" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Order Confirmed!</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Thank you, {order.customer.fullName}. Your order has been placed and is being prepared.
          </p>

          <div className="mt-4 inline-block bg-slate-100 text-slate-700 px-3.5 py-1 rounded-full text-xs font-mono font-medium">
            Order #{order.orderId}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Shipping & Delivery Method */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Shipping To</span>
              <strong className="text-slate-900">{order.customer.fullName}</strong>
              <div className="text-slate-500 mt-0.5">{order.customer.phoneNumber}</div>
              <div className="text-slate-600 mt-1">{order.customer.address}, {order.customer.city}</div>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">Delivery Service</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mt-0.5">
                {order.deliveryMethod === 'express' ? (
                  <>
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Express Courier</span>
                  </>
                ) : (
                  <>
                    <Truck className="w-3.5 h-3.5 text-slate-600" />
                    <span>Standard Delivery</span>
                  </>
                )}
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                {order.deliveryMethod === 'express' ? 'Same-day / Next-day priority' : '2-3 business days'}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200/60">
                <span className="text-slate-400 font-medium block">Payment</span>
                <span className="font-semibold text-slate-900 capitalize">
                  {order.paymentMethod === 'bakong' ? 'Bakong KHQR' : order.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                </span>
              </div>
            </div>
          </div>

          {/* Purchased Items */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-slate-400" />
              Purchased Items ({order.items.length})
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl p-3">
              {order.items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedColor}`}
                  className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-50 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{item.name}</p>
                      <p className="text-[11px] text-slate-400">Qty {item.quantity} • {item.selectedColor}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 flex-shrink-0">
                    {formatUSD(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="space-y-1.5 text-xs pt-2">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>{formatUSD(order.totals.subtotal)}</span>
            </div>
            {order.totals.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Discount</span>
                <span>-{formatUSD(order.totals.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500">
              <span>Delivery ({order.deliveryMethod === 'express' ? 'Express' : 'Standard'})</span>
              <span>{order.totals.shippingFee === 0 ? 'Free' : formatUSD(order.totals.shippingFee)}</span>
            </div>
            <div className="pt-2.5 border-t border-slate-200 flex justify-between items-baseline font-bold">
              <span className="text-sm text-slate-900">Total Paid</span>
              <div className="text-right">
                <span className="text-lg font-black text-slate-900">
                  {formatUSD(order.totals.grandTotal)}
                </span>
                <span className="text-[11px] text-slate-400 block font-normal">
                  ≈ {formatKHR(order.totals.grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <Link
              to="/"
              className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Back to Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
