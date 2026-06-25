'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { AuthModal } from '@/components/auth-modal';

interface HeaderProps {
  showBack?: boolean;
  title?: string;
  showSearch?: boolean;
}

function HeaderContent({ showBack = false, title, showSearch = true }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const { totalItems } = useCart();
  const { user, setAuthModalOpen } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-[#eceef1] px-3 py-2 flex flex-col gap-2 select-none">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 shrink-0">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="p-1 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-700"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          )}

          <Link href="/" className="flex flex-col">
            <span className="text-[#0056c3] font-black text-[17px] tracking-tight leading-none italic flex items-center">
              Flipkart
              <span className="text-[#dbc90a] ml-0.5 text-[18px] not-italic leading-none">✦</span>
            </span>
            <span className="text-[9px] font-semibold text-slate-500 tracking-wider flex items-center gap-0.5">
              Explore <span className="text-[#dbc90a] font-bold">Plus</span>
            </span>
          </Link>
        </div>

        {title && (
          <h1 className="text-[15px] font-bold text-[#191c1e] truncate flex-1 text-center px-2">
            {title}
          </h1>
        )}

        {!title && (
          <div className="flex items-center gap-1 min-w-0 flex-1 justify-center">
            <div className="bg-[#eff1f4] px-2 py-1 rounded-md text-[10px] font-bold text-[#0056c3] flex items-center gap-1 cursor-pointer hover:bg-blue-100 transition-colors truncate">
              <span>⚡ 11 MINS</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 shrink-0">
          {/* User Profile / Login Button */}
          {user ? (
            <Link
              href="/account"
              className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-[#0056c3] px-2 py-1 rounded-lg text-[11px] font-black transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span className="max-w-[50px] truncate hidden sm:inline">{user.name.split(' ')[0]}</span>
            </Link>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="bg-[#2874f0] hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-[11px] font-black shadow-2xs active:scale-95 transition-all"
            >
              Login
            </button>
          )}

          <Link
            href="/cart"
            className="relative p-1.5 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-[#191c1e]"
            aria-label="Shopping Cart"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ba1a1a] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {showSearch && (
        <form onSubmit={handleSearch} className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Products, Brands & More"
            className="w-full bg-[#f2f4f7] hover:bg-[#eceef1] focus:bg-white text-[13px] text-[#191c1e] placeholder-slate-400 pl-10 pr-10 py-2 rounded-lg border border-transparent focus:border-[#0056c3] outline-none transition-all shadow-inner font-medium"
          />
          <button
            type="button"
            onClick={() => alert('Voice search simulation active')}
            className="absolute right-2 p-1 text-slate-400 hover:text-[#0056c3] transition-colors flex items-center justify-center"
            aria-label="Voice Search"
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
        </form>
      )}

      {/* Global Auth Modal */}
      <AuthModal />
    </header>
  );
}

export function Header(props: HeaderProps) {
  return (
    <Suspense fallback={<header className="sticky top-0 z-40 bg-white h-[57px] shadow-sm border-b border-[#eceef1]" />}>
      <HeaderContent {...props} />
    </Suspense>
  );
}
