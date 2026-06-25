'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { ProductCard } from '@/components/product-card';
import { CATEGORIES, BANNERS, PRODUCTS } from '@/lib/data';

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ h: 14, m: 28, s: 45 });

  // Auto slide banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Countdown clock
  useEffect(() => {
    const clock = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: 59, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return { h: 12, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  const dealsOfTheDay = PRODUCTS.slice(0, 4);
  const trendingProducts = PRODUCTS.slice(4);

  return (
    <div className="flex flex-col min-h-full bg-[#f7f9fc] select-none">
      <Header />

      {/* Category Icons Row */}
      <div className="bg-white py-3 px-3 shadow-2xs border-b border-[#eceef1] overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between gap-4 min-w-max px-1">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/search?category=${cat.id}`}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="w-13 h-13 rounded-full bg-[#f2f4f7] border border-[#e0e3e6] p-0.5 flex items-center justify-center overflow-hidden group-hover:border-[#0056c3] group-hover:scale-105 transition-all shadow-2xs">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="material-symbols-outlined text-[#0056c3] text-[26px]">
                    {cat.icon}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-semibold text-[#191c1e] tracking-tight group-hover:text-[#0056c3] transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Banner Carousel */}
      <div className="p-3">
        <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[21/9] bg-slate-900">
          {BANNERS.map((banner, idx) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 bg-gradient-to-r ${banner.bg} p-4 flex flex-col justify-between text-white ${
                idx === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="bg-[#dbc90a] text-[#201c00] text-[9px] font-black px-2 py-0.5 rounded shadow-xs tracking-wider uppercase">
                  {banner.tag}
                </span>
                <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                  Ad
                </span>
              </div>

              <div className="z-10 max-w-[70%] my-auto">
                <h2 className="text-[18px] md:text-[22px] font-black leading-tight tracking-tight drop-shadow-sm">
                  {banner.title}
                </h2>
                <p className="text-[11px] md:text-[13px] font-medium opacity-90 mt-1">
                  {banner.subtitle}
                </p>
                <Link
                  href="/search"
                  className="mt-2 inline-flex items-center gap-1 bg-white text-[#0056c3] font-black text-[11px] px-3 py-1.5 rounded-lg shadow-sm active:scale-95 transition-transform"
                >
                  Shop Now
                  <span className="material-symbols-outlined text-[14px] font-bold">arrow_forward</span>
                </Link>
              </div>

              {banner.image && (
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute right-0 bottom-0 h-full w-[45%] object-cover opacity-85 mask-gradient mix-blend-overlay"
                />
              )}
            </div>
          ))}

          {/* Carousel Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentBanner ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bank Offer Strip */}
      <div className="px-3 pb-3">
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-2.5 border border-blue-100 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0056c3] text-white flex items-center justify-center font-black text-[14px] shadow-xs">
              %
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold text-[#001944]">
                Flipkart Axis Bank Card
              </span>
              <span className="text-[10px] font-medium text-slate-600">
                Unlimited 5% Cashback on all orders
              </span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-[#0056c3] pr-1">Apply &gt;</span>
        </div>
      </div>

      {/* Deals of the Day Strip */}
      <div className="bg-white py-3 border-y border-[#eceef1] mb-2">
        <div className="px-3 flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] font-bold text-[#191c1e]">Deals of the Day</h2>
            <div className="flex items-center gap-1 bg-[#ba1a1a]/10 px-2 py-0.5 rounded text-[#ba1a1a] font-mono font-bold text-[11px]">
              <span className="material-symbols-outlined text-[14px] animate-spin">timer</span>
              <span>
                {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
              </span>
            </div>
          </div>
          <Link href="/search" className="bg-[#0056c3] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs active:scale-95 transition-transform">
            View All
          </Link>
        </div>

        <div className="px-3 grid grid-cols-2 gap-2.5">
          {dealsOfTheDay.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>

      {/* Sponsored Ad Banner */}
      <div className="p-3">
        <div className="bg-slate-900 rounded-xl p-3.5 text-white flex items-center justify-between relative overflow-hidden shadow-md">
          <div className="z-10 max-w-[65%]">
            <span className="text-[9px] font-black text-[#dbc90a] uppercase tracking-widest">
              Brand Spotlight
            </span>
            <h3 className="text-[16px] font-bold mt-0.5">Sony Audio Series</h3>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Flagship wireless audio starting at ₹19,990
            </p>
          </div>
          <Link
            href="/product/sony-wh1000xm5"
            className="z-10 bg-[#dbc90a] text-[#201c00] font-black text-[11px] px-3 py-1.5 rounded-lg shadow-sm"
          >
            Explore
          </Link>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#0056c3]/30 rounded-full blur-xl" />
        </div>
      </div>

      {/* Trending Products Grid */}
      <div className="bg-white py-3 border-t border-[#eceef1] mb-6 flex-1">
        <div className="px-3 flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-bold text-[#191c1e]">Trending Now</h2>
          <span className="text-[11px] font-semibold text-slate-400">Curated for you</span>
        </div>

        <div className="px-3 grid grid-cols-2 gap-2.5">
          {trendingProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
