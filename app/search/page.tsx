'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { ProductCard } from '@/components/product-card';
import { PRODUCTS, CATEGORIES } from '@/lib/data';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q')?.toLowerCase() || '';
  const categoryParam = searchParams?.get('category') || '';

  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');
  const [activeTab, setActiveTab] = useState<'all' | 'assured'>('all');
  const [layout, setLayout] = useState<'grid' | 'horizontal'>('grid');

  // Filter products
  let filtered = PRODUCTS.filter((p) => {
    const matchesQuery =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);

    const matchesCat = !categoryParam || p.category === categoryParam;
    const matchesAssured = activeTab === 'all' || (activeTab === 'assured' && p.assured);

    return matchesQuery && matchesCat && matchesAssured;
  });

  // Sort products
  filtered.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // popularity
  });

  const activeCategory = CATEGORIES.find((c) => c.id === categoryParam);

  return (
    <div className="flex flex-col min-h-full bg-[#f7f9fc] select-none">
      <Header showBack title={activeCategory ? activeCategory.name : query ? `Results for "${query}"` : 'All Products'} />

      {/* Filter and Sort Bar */}
      <div className="sticky top-[57px] z-30 bg-white border-b border-[#eceef1] shadow-2xs">
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 text-[12px] font-semibold text-slate-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const order = ['popularity', 'price-asc', 'price-desc', 'rating'] as const;
                const nextIdx = (order.indexOf(sortBy) + 1) % order.length;
                setSortBy(order[nextIdx]);
              }}
              className="flex items-center gap-1 hover:text-[#0056c3]"
            >
              <span className="material-symbols-outlined text-[18px]">sort</span>
              <span>
                Sort: {sortBy === 'popularity' ? 'Popularity' : sortBy === 'price-asc' ? 'Price Low' : sortBy === 'price-desc' ? 'Price High' : 'Rating'}
              </span>
            </button>

            <button
              onClick={() => alert('Advanced filters dialog demo')}
              className="flex items-center gap-1 hover:text-[#0056c3]"
            >
              <span className="material-symbols-outlined text-[18px]">filter_alt</span>
              <span>Filter</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLayout(layout === 'grid' ? 'horizontal' : 'grid')}
              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
              aria-label="Toggle layout"
            >
              <span className="material-symbols-outlined text-[18px]">
                {layout === 'grid' ? 'view_list' : 'grid_view'}
              </span>
            </button>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto no-scrollbar bg-[#fcfdfe]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
              activeTab === 'all'
                ? 'bg-[#0056c3] text-white shadow-xs'
                : 'bg-[#f2f4f7] text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Products ({PRODUCTS.length})
          </button>
          <button
            onClick={() => setActiveTab('assured')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 flex items-center gap-1 ${
              activeTab === 'assured'
                ? 'bg-[#0056c3] text-white shadow-xs'
                : 'bg-[#f2f4f7] text-[#0056c3] hover:bg-slate-200'
            }`}
          >
            <span>✔ Flipkart Assured</span>
          </button>
          <button
            onClick={() => setSortBy('rating')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
              sortBy === 'rating'
                ? 'bg-[#0b6b1d] text-white shadow-xs'
                : 'bg-[#f2f4f7] text-slate-600 hover:bg-slate-200'
            }`}
          >
            ★ 4.5+ Rated
          </button>
          <button
            onClick={() => setSortBy('price-asc')}
            className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#f2f4f7] text-slate-600 hover:bg-slate-200 shrink-0"
          >
            Under ₹25,000
          </button>
        </div>
      </div>

      {/* Results Count Summary */}
      <div className="px-3 py-2 bg-[#eceef1]/50 text-[11px] text-slate-500 font-medium flex justify-between items-center">
        <span>Showing {filtered.length} matching items</span>
        {query && <span className="text-slate-700 font-bold">Query: "{query}"</span>}
      </div>

      {/* Product List/Grid */}
      <div className="p-2.5 flex-1 pb-8">
        {filtered.length > 0 ? (
          <div
            className={
              layout === 'grid'
                ? 'grid grid-cols-2 gap-2.5'
                : 'flex flex-col gap-2.5'
            }
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} layout={layout} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <span className="material-symbols-outlined text-[40px]">search_off</span>
            </div>
            <h3 className="text-[16px] font-bold text-[#191c1e]">No matching products found</h3>
            <p className="text-[12px] text-slate-500 mt-1 max-w-xs">
              We couldn't find anything matching your filters. Try removing filters or searching for something else like "iPhone" or "Sony".
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSortBy('popularity');
              }}
              className="mt-4 bg-[#0056c3] text-white text-[12px] font-bold px-4 py-2 rounded-lg shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-medium">Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
