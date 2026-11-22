import React from 'react';
import { Check, Package, ArrowRight, Printer, QrCode } from 'lucide-react';
import { formatUSD, formatKHR } from '../data/products';

export default function OrderSuccessModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden my-6 animate-fadeIn">
        {/* Clean Header */}
        <div className="p-6 text-center border-b border-slate-100">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <Check className="w-6 h-6 stroke-[2.5]" />
          </div>

          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Order Confirmed</h2>
          <p className="text-xs text-slate-500 mt-1">
            Thank you for your purchase. We've received your order.
          </p>

          <div className="mt-3 inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-mono font-medium">
            Order #{order.orderId}
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 space-y-4">
          {/* Summary Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Customer</span>
              <span className="font-medium text-slate-900">{order.customer.fullName} ({order.customer.phoneNumber})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery To</span>
              <span className="font-medium text-slate-900">{order.customer.address}, {order.customer.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment</span>
              <span className="font-medium text-slate-900">
                {order.paymentMethod === 'bakong' ? 'Bakong KHQR (Paid)' : order.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
              </span>
            </div>
          </div>

          {/* Items List */}
          <div>
            <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-slate-400" />
              Items ({order.items.length})
            </div>
            <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
              {order.items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedColor}`}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 rounded-lg object-cover bg-slate-50 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 truncate">{item.name}</p>
                      <p className="text-[10px] text-slate-400">Qty {item.quantity} • {item.selectedColor}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-900 flex-shrink-0">
                    {formatUSD(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Breakdown */}
          <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
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
              <span>Delivery</span>
              <span>{order.totals.shipping === 0 ? 'Free' : formatUSD(order.totals.shipping)}</span>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline font-semibold">
              <span className="text-sm text-slate-900">Total Paid</span>
              <div className="text-right">
                <span className="text-base font-bold text-slate-900">
                  {formatUSD(order.totals.grandTotal)}
                </span>
                <span className="text-[11px] text-slate-400 block font-normal">
                  ≈ {formatKHR(order.totals.grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <span>Done</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
