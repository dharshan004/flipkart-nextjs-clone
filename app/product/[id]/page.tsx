'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { PRODUCTS } from '@/lib/data';
import { useCart } from '@/context/cart-context';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const [selectedImg, setSelectedImg] = useState(0);
  const [pincode, setPincode] = useState('560001');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'checking' | 'valid'>('valid');
  const [addedNotice, setAddedNotice] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push('/cart');
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus('checking');
      setTimeout(() => setPincodeStatus('valid'), 600);
    } else {
      alert('Please enter a valid 6-digit PIN code');
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.originalPrice);

  const imagesList = product.images?.length ? product.images : [product.image];

  return (
    <div className="flex flex-col min-h-full bg-white select-none pb-20 relative">
      <Header showBack showSearch={false} title="Product Details" />

      {/* Added Toast Notification */}
      {addedNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0b6b1d] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-[13px] font-bold animate-bounce">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>Added to Shopping Cart!</span>
          <Link href="/cart" className="ml-2 underline font-black hover:text-yellow-200">
            View Cart
          </Link>
        </div>
      )}

      {/* Image Gallery */}
      <div className="relative w-full aspect-square bg-[#f7f9fc] flex items-center justify-center p-6 border-b border-slate-100 overflow-hidden">
        <img
          src={imagesList[selectedImg]}
          alt={product.title}
          className="w-full h-full object-contain transition-all duration-300 scale-100 hover:scale-105"
        />

        {/* Wishlist Floating Button */}
        <button
          onClick={() => alert('Wishlisted!')}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white shadow-md text-slate-400 hover:text-[#ba1a1a] transition-colors"
          aria-label="Wishlist"
        >
          <span className="material-symbols-outlined text-[22px]">favorite</span>
        </button>

        {product.badge && (
          <span className="absolute bottom-4 left-4 bg-[#dbc90a] text-[#201c00] text-[10px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-wider">
            {product.badge}
          </span>
        )}
      </div>

      {/* Thumbnail Selector */}
      {imagesList.length > 1 && (
        <div className="flex justify-center gap-2 py-3 px-4 bg-slate-50 border-b border-slate-100">
          {imagesList.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImg(idx)}
              className={`w-12 h-12 rounded-lg p-1 bg-white border transition-all ${
                selectedImg === idx
                  ? 'border-[#0056c3] shadow-sm scale-105'
                  : 'border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={imgUrl} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}

      {/* Title & Pricing Section */}
      <div className="p-4 border-b border-slate-100">
        <h1 className="text-[16px] md:text-[18px] font-semibold text-[#191c1e] leading-snug">
          {product.title}
        </h1>

        <div className="flex items-center gap-2 mt-2">
          <span className="bg-[#0b6b1d] text-white text-[12px] font-extrabold px-2 py-0.5 rounded flex items-center gap-0.5 shadow-xs">
            {product.rating}
            <span className="material-symbols-outlined text-[14px] fill-current">star</span>
          </span>
          <span className="text-[13px] text-slate-500 font-medium">
            {product.reviewsCount.toLocaleString()} Ratings &amp; Reviews
          </span>
          {product.assured && (
            <span className="text-[11px] font-black italic text-[#0056c3] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 ml-auto">
              ✔ Flipkart Assured
            </span>
          )}
        </div>

        <div className="mt-3 flex items-baseline gap-2.5">
          <span className="text-[24px] font-black text-[#191c1e] tracking-tight">
            {formattedPrice}
          </span>
          <span className="text-[15px] text-slate-400 line-through font-normal">
            {formattedOriginalPrice}
          </span>
          <span className="text-[15px] font-extrabold text-[#0b6b1d]">
            {product.discount}% off
          </span>
        </div>

        <div className="mt-1 text-[11px] text-slate-500 font-medium">
          Inclusive of all taxes + <span className="text-[#0b6b1d] font-bold">Free Delivery</span>
        </div>
      </div>

      {/* Bank Offers Box */}
      <div className="p-4 border-b border-slate-100 bg-[#f7f9fc]/60">
        <h2 className="text-[14px] font-bold text-[#191c1e] mb-2 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#0056c3] text-[20px]">local_offer</span>
          Available Offers
        </h2>

        <div className="flex flex-col gap-2 text-[12px] text-slate-700">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#0b6b1d] text-[16px] mt-0.5">sell</span>
            <div>
              <span className="font-bold">Bank Offer:</span> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card.
              <span className="text-[#0056c3] font-bold ml-1 cursor-pointer">T&amp;C</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#0b6b1d] text-[16px] mt-0.5">sell</span>
            <div>
              <span className="font-bold">Special Price:</span> Get extra ₹11,000 off (price inclusive of cashback/coupon).
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#0b6b1d] text-[16px] mt-0.5">sell</span>
            <div>
              <span className="font-bold">Partner Offer:</span> Sign up for Flipkart Pay Later &amp; get ₹1,000 gift card.
            </div>
          </div>
        </div>
      </div>

      {/* Delivery PIN Code Widget */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-bold text-slate-700 flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            Deliver to
          </span>
        </div>

        <form onSubmit={checkPincode} className="flex items-center gap-2">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter Delivery Pincode"
            className="flex-1 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-[13px] font-bold text-slate-800 outline-none focus:border-[#0056c3] transition-colors"
          />
          <button
            type="submit"
            disabled={pincodeStatus === 'checking'}
            className="bg-[#0056c3] text-white font-bold text-[12px] px-4 py-2 rounded-lg active:scale-95 transition-transform shrink-0"
          >
            {pincodeStatus === 'checking' ? 'Checking...' : 'Check'}
          </button>
        </form>

        {pincodeStatus === 'valid' && (
          <div className="mt-2 text-[12px] font-semibold text-[#0b6b1d] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            <span>Delivery available by <strong>Tomorrow, 8 PM</strong></span>
          </div>
        )}
      </div>

      {/* Product Highlights */}
      {product.highlights?.length > 0 && (
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-[14px] font-bold text-[#191c1e] mb-2.5">Highlights</h2>
          <ul className="grid grid-cols-1 gap-2 pl-4 list-disc text-[13px] text-slate-700 font-medium">
            {product.highlights.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Specifications */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-[14px] font-bold text-[#191c1e] mb-3">Specifications</h2>
          <div className="flex flex-col border border-slate-100 rounded-xl overflow-hidden">
            {Object.entries(product.specs).map(([key, val], idx) => (
              <div
                key={key}
                className={`flex p-3 text-[13px] ${
                  idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'
                }`}
              >
                <span className="w-2/5 text-slate-400 font-medium">{key}</span>
                <span className="w-3/5 text-slate-800 font-semibold">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-[14px] font-bold text-[#191c1e] mb-2">Description</h2>
        <p className="text-[13px] text-slate-600 leading-relaxed font-normal">
          {product.description}
        </p>
      </div>

      {/* Customer Ratings Summary */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#191c1e]">Ratings &amp; Reviews</h2>
          <button onClick={() => alert('Rate product modal demo')} className="text-[#0056c3] font-bold text-[12px]">
            Rate Product
          </button>
        </div>

        <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-xl">
          <div className="flex flex-col items-center">
            <span className="text-[32px] font-black text-[#191c1e] leading-none">
              {product.rating}★
            </span>
            <span className="text-[11px] text-slate-500 mt-1 text-center font-medium">
              {product.reviewsCount.toLocaleString()} Verified Buyers
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-1.5 text-[10px] font-bold text-slate-500">
            <div className="flex items-center gap-2">
              <span>5★</span>
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[82%] h-full bg-[#0b6b1d] rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>4★</span>
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[12%] h-full bg-[#0b6b1d] rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>3★</span>
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[4%] h-full bg-[#dbc90a] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="fixed md:absolute bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-10px_25px_rgba(0,0,0,0.1)] h-14 flex select-none">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 bg-[#ffeb3b] hover:bg-[#fdd835] text-[#201c00] font-black text-[14px] uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px] font-bold">shopping_cart</span>
          Add to Cart
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 bg-[#2874f0] hover:bg-[#1f6feb] text-white font-black text-[14px] uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px] font-bold">bolt</span>
          Buy Now
        </button>
      </div>
    </div>
  );
}
