import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Download, Zap, CheckCircle2, ArrowRight, RefreshCw, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { downloadRobloxPlaceFile } from '../utils/robloxDownload';
import { sounds } from '../utils/sound';

export default function CartModal({ isOpen, onClose, cart, onRemoveFromCart, onClearCart, onOpenSupportWithOrder }) {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);
    sounds.playPop();

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrder = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Complete order
      const orderData = {
        orderNumber: randomOrder,
        items: [...cart],
        total,
        paymentMethod,
        date: new Date().toISOString(),
        customerEmail: email || 'guest_dev@roblox.io'
      };
      setOrderComplete(orderData);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      sounds.playSuccess();

      // Automatically trigger downloads for purchased items
      cart.forEach((item, idx) => {
        setTimeout(() => {
          downloadRobloxPlaceFile(item);
        }, idx * 600);
      });

      onClearCart();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-md h-full bg-[#0c0c0f] border-l border-[#1f1f24] shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#1f1f24] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <h2 className="text-lg font-bold text-white">Your Cart</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-[#ef233c] text-white">
              {cart.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {orderComplete ? (
            /* Order Success View */
            <div className="py-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">Payment Confirmed!</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Your files have started downloading automatically (.rbxl).
                </p>
              </div>

              <div className="bg-[#121216] border border-[#27272a] rounded-xl p-4 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Order Ref:</span>
                  <span className="text-amber-400 font-bold">{orderComplete.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Total Paid:</span>
                  <span className="text-white">${orderComplete.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Method:</span>
                  <span className="uppercase text-zinc-300">{orderComplete.paymentMethod}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-zinc-400">
                  Didn't download automatically? Click below to re-download.
                </p>
                {orderComplete.items.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => downloadRobloxPlaceFile(it)}
                    className="w-full py-2 bg-[#18181c] hover:bg-[#23232a] border border-[#27272a] rounded-lg text-xs font-semibold text-white flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download {it.title} (.rbxl)</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#1f1f24] space-y-2">
                <button
                  onClick={() => {
                    onOpenSupportWithOrder(orderComplete.orderNumber);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center space-x-1.5"
                >
                  <span>Need help? Open support ticket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setOrderComplete(null);
                    onClose();
                  }}
                  className="w-full py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart View */
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mx-auto">
                <Zap className="w-5 h-5 text-zinc-500" />
              </div>
              <p className="text-sm font-semibold text-white">Your cart is empty</p>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Browse our builds and add combat engines, complete games or VFX systems to your cart.
              </p>
            </div>
          ) : (
            /* Cart Items */
            <div className="space-y-4">
              <div className="space-y-2.5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#121216] border border-[#222228] rounded-xl p-3.5 flex items-center justify-between"
                  >
                    <div className="space-y-0.5 max-w-[220px]">
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                      <div className="text-[10px] text-zinc-500 font-mono">{item.fileType}</div>
                      <div className="text-xs font-bold text-[#ef233c]">${item.price.toFixed(2)}</div>
                    </div>

                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Payment selector */}
              <div className="pt-4 border-t border-[#1f1f24] space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Payment Method (Instant Delivery)
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 rounded-lg border text-xs font-medium flex items-center justify-center space-x-2 transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-[#ef233c] bg-[#ef233c]/10 text-white'
                        : 'border-[#222228] bg-[#121216] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>🅿️ PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-3 rounded-lg border text-xs font-medium flex items-center justify-center space-x-2 transition-all ${
                      paymentMethod === 'crypto'
                        ? 'border-[#ef233c] bg-[#ef233c]/10 text-white'
                        : 'border-[#222228] bg-[#121216] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>₿ Crypto (BTC/SOL)</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-zinc-400">
                    Delivery Email (optional for receipt)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com (no password needed)"
                    className="w-full px-3 py-2 bg-[#121216] border border-[#27272a] focus:border-[#ef233c] text-white text-xs rounded-lg placeholder-zinc-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Bar */}
        {!orderComplete && cart.length > 0 && (
          <div className="p-5 border-t border-[#1f1f24] bg-[#0c0c0f] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Total</span>
              <span className="text-xl font-black text-white">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-3 bg-[#ef233c] hover:bg-[#d90429] disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(239,35,60,0.3)] flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying payment gateway...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay with {paymentMethod === 'paypal' ? 'PayPal' : 'Crypto'} (${total.toFixed(2)})</span>
                </>
              )}
            </button>

            <div className="text-[10px] text-zinc-400 text-center flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Instant download starts automatically upon completion.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
