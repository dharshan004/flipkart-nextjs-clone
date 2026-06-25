'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { useCart } from '@/context/cart-context';
import { CheckoutModal } from '@/components/checkout-modal';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    totalOriginalPrice,
    totalDiscount,
  } = useCart();

  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);

  const formattedTotalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const formattedOriginalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(totalOriginalPrice);

  const formattedDiscount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(totalDiscount);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setCheckoutOpen(true);
  };

  const handlePaymentSuccess = (orderId: string) => {
    setCheckoutOpen(false);
    setSuccessOrderId(orderId);
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  if (successOrderId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] bg-white p-6 text-center select-none animate-fade-in m-auto">
        <div className="w-24 h-24 bg-[#0b6b1d]/10 rounded-full flex items-center justify-center text-[#0b6b1d] mb-6 animate-bounce">
          <span className="material-symbols-outlined text-[64px]">check_circle</span>
        </div>
        <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase bg-slate-100 px-3 py-1 rounded-full">
          Razorpay Verified
        </span>
        <h1 className="text-[24px] font-black text-[#191c1e] mt-3">Order Placed Successfully!</h1>
        <p className="text-[13px] text-slate-500 mt-1">
          Order ID: <strong className="text-slate-800 font-mono">{successOrderId}</strong>
        </p>
        <p className="text-[13px] text-slate-500 mt-2 max-w-sm">
          Thank you for shopping with Flipkart Replica. You earned <strong>+🪙{Math.floor((totalPrice + 3) / 100)} SuperCoins</strong> on this purchase!
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Link
            href="/account/orders"
            className="flex-1 bg-[#0056c3] text-white font-bold text-[13px] py-3 px-4 rounded-xl shadow-md active:scale-95 transition-transform text-center"
          >
            Track Order
          </Link>
          <Link
            href="/"
            onClick={() => setSuccessOrderId(null)}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[13px] py-3 px-4 rounded-xl active:scale-95 transition-transform text-center"
          >
            Shop More
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-[#f7f9fc] select-none pb-20 relative">
      <Header showBack showSearch={false} title={`My Cart (${totalItems})`} />

      {/* Deliver To Strip */}
      <div className="bg-white px-4 py-3 border-b border-[#eceef1] flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2 text-[13px]">
          <span className="font-bold text-slate-800">Deliver to: SEC Demo, 560001</span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            Home
          </span>
        </div>
        <button onClick={() => alert('Change address modal demo')} className="text-[#0056c3] font-bold text-[12px]">
          Change
        </button>
      </div>

      {cart.length > 0 ? (
        <div className="flex flex-col gap-2 p-2.5">
          {/* Cart Items List */}
          <div className="flex flex-col bg-white rounded-xl border border-[#eceef1] overflow-hidden divide-y divide-slate-100 shadow-2xs">
            {cart.map((item) => {
              const prod = item.product;
              const prodPrice = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
              }).format(prod.price * item.quantity);

              const prodOriginalPrice = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
              }).format(prod.originalPrice * item.quantity);

              return (
                <div key={prod.id} className="p-3.5 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <Link
                      href={`/product/${prod.id}`}
                      className="w-20 h-20 bg-[#f7f9fc] rounded-lg p-1.5 shrink-0 flex items-center justify-center overflow-hidden border border-slate-100"
                    >
                      <img src={prod.image} alt="" className="w-full h-full object-contain" />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${prod.id}`}
                        className="text-[13px] font-medium text-[#191c1e] line-clamp-2 leading-snug hover:text-[#0056c3]"
                      >
                        {prod.title}
                      </Link>

                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <span>Seller: RetailVelocity</span>
                        {prod.assured && (
                          <span className="text-[10px] font-black italic text-[#0056c3] bg-blue-50 px-1 rounded border border-blue-100 ml-1">
                            ✔ Assured
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-[16px] font-extrabold text-[#191c1e]">
                          {prodPrice}
                        </span>
                        <span className="text-[12px] text-slate-400 line-through">
                          {prodOriginalPrice}
                        </span>
                        <span className="text-[12px] font-bold text-[#0b6b1d]">
                          {prod.discount}% off
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Actions Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(prod.id, -1)}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-black text-slate-600 hover:bg-slate-100 active:scale-90 transition-all"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-[13px] font-extrabold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(prod.id, 1)}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center font-black text-slate-600 hover:bg-slate-100 active:scale-90 transition-all"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-[12px] font-bold text-slate-600">
                      <button
                        onClick={() => removeFromCart(prod.id)}
                        className="hover:text-[#ba1a1a] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Price Breakdown Card */}
          <div className="bg-white rounded-xl border border-[#eceef1] p-4 shadow-2xs" id="price-details">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100">
              Price Details
            </h2>

            <div className="flex flex-col gap-2.5 py-3 text-[13px] text-slate-700 font-medium border-b border-slate-100">
              <div className="flex justify-between">
                <span>Price ({totalItems} items)</span>
                <span>{formattedOriginalPrice}</span>
              </div>
              <div className="flex justify-between text-[#0b6b1d]">
                <span>Discount</span>
                <span>− {formattedDiscount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-[#0b6b1d] font-bold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>₹3</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-3 text-[16px] font-black text-[#191c1e]">
              <span>Total Amount</span>
              <span>₹{(totalPrice + 3).toLocaleString('en-IN')}</span>
            </div>

            <div className="bg-[#0b6b1d]/10 text-[#0b6b1d] p-2.5 rounded-lg text-[12px] font-bold text-center mt-1">
              You will save ₹{totalDiscount.toLocaleString('en-IN')} on this order
            </div>
          </div>

          {/* Security Banner */}
          <div className="flex items-center justify-center gap-2 py-4 text-slate-400 text-[11px] font-bold tracking-wider uppercase">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center m-auto">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <span className="material-symbols-outlined text-[48px]">shopping_cart</span>
          </div>
          <h2 className="text-[18px] font-black text-[#191c1e]">Your cart is empty</h2>
          <p className="text-[13px] text-slate-500 mt-1 max-w-xs">
            Looks like you haven't added anything to your cart yet. Explore our top deals and flagship gadgets!
          </p>
          <Link
            href="/"
            className="mt-6 bg-[#0056c3] text-white font-bold text-[13px] px-6 py-2.5 rounded-xl shadow-md active:scale-95 transition-transform"
          >
            Shop Now
          </Link>
        </div>
      )}

      {/* Sticky Checkout Bar */}
      {cart.length > 0 && (
        <div className="fixed md:absolute bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-10px_25px_rgba(0,0,0,0.1)] h-14 px-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[18px] font-black text-[#191c1e] leading-none">
              ₹{(totalPrice + 3).toLocaleString('en-IN')}
            </span>
            <Link href="#price-details" className="text-[10px] font-bold text-[#0056c3]">
              View Price Details
            </Link>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-[#ffeb3b] hover:bg-[#fdd835] text-[#201c00] font-black text-[13px] uppercase tracking-wider px-8 py-2.5 rounded-xl shadow-sm active:scale-95 transition-transform cursor-pointer"
          >
            Place Order
          </button>
        </div>
      )}

      {/* Razorpay Simulated Checkout Popup */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
