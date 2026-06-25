'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCart } from '@/context/cart-context';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'horizontal';
}

export function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1000);
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

  if (layout === 'horizontal') {
    return (
      <Link
        href={`/product/${product.id}`}
        className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#eceef1] hover:shadow-md transition-all relative group overflow-hidden"
      >
        <div className="relative w-24 h-24 bg-[#f7f9fc] rounded-lg p-2 flex items-center justify-center shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <span className="absolute top-1 left-1 bg-[#dbc90a] text-[#201c00] text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between h-24 py-0.5">
          <div>
            <h3 className="text-[13px] font-medium text-[#191c1e] line-clamp-2 leading-tight group-hover:text-[#0056c3] transition-colors">
              {product.title}
            </h3>
            
            <div className="flex items-center gap-1.5 mt-1">
              <span className="bg-[#0b6b1d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                {product.rating}
                <span className="material-symbols-outlined text-[10px] fill-current">star</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                ({product.reviewsCount.toLocaleString()})
              </span>
              {product.assured && (
                <span className="text-[10px] font-black italic text-[#0056c3] bg-blue-50 px-1 rounded ml-1 border border-blue-100">
                  ✔ Assured
                </span>
              )}
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[15px] font-bold text-[#191c1e]">{formattedPrice}</span>
            <span className="text-[11px] text-slate-400 line-through font-normal">
              {formattedOriginalPrice}
            </span>
            <span className="text-[11px] font-bold text-[#0b6b1d]">
              {product.discount}% off
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#eceef1] hover:shadow-lg transition-all flex flex-col justify-between relative group select-none overflow-hidden h-full">
      <Link href={`/product/${product.id}`} className="flex-1 flex flex-col p-2.5">
        <div className="relative w-full aspect-square bg-[#f7f9fc] rounded-lg p-3 flex items-center justify-center overflow-hidden mb-2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xs hover:bg-white text-slate-400 hover:text-[#ba1a1a] transition-all shadow-xs flex items-center justify-center z-10"
            aria-label="Add to wishlist"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                isWishlisted ? 'text-[#ba1a1a] fill-current animate-ping' : ''
              }`}
            >
              favorite
            </span>
          </button>

          {product.badge && (
            <span className="absolute bottom-1 left-1 bg-[#dbc90a] text-[#201c00] text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 justify-start gap-1">
          <h3 className="text-[13px] font-medium text-[#191c1e] line-clamp-2 leading-tight group-hover:text-[#0056c3] transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="bg-[#0b6b1d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-2xs">
              {product.rating}
              <span className="material-symbols-outlined text-[10px] fill-current">star</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              ({product.reviewsCount > 1000 ? `${(product.reviewsCount / 1000).toFixed(1)}k` : product.reviewsCount})
            </span>
            {product.assured && (
              <span className="text-[9px] font-black italic text-[#0056c3] bg-blue-50 px-1 rounded ml-auto border border-blue-100">
                ✔ Assured
              </span>
            )}
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-baseline flex-wrap gap-x-1.5 gap-y-0.5">
          <span className="text-[15px] font-extrabold text-[#191c1e]">
            {formattedPrice}
          </span>
          <span className="text-[11px] text-slate-400 line-through font-normal">
            {formattedOriginalPrice}
          </span>
          <span className="text-[11px] font-bold text-[#0b6b1d]">
            {product.discount}% off
          </span>
        </div>
      </Link>

      <div className="px-2.5 pb-2.5 pt-0">
        <button
          onClick={handleQuickAdd}
          className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 ${
            addedAnim
              ? 'bg-[#0b6b1d] text-white'
              : 'bg-[#f2f4f7] hover:bg-[#0056c3] text-[#191c1e] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {addedAnim ? 'check' : 'add_shopping_cart'}
          </span>
          {addedAnim ? 'Added!' : 'Quick Add'}
        </button>
      </div>
    </div>
  );
}
