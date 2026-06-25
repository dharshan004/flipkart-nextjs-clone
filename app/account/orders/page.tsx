'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { useAuth } from '@/context/auth-context';

export default function MyOrdersPage() {
  const { orders } = useAuth();

  return (
    <div className="flex flex-col min-h-full bg-[#f7f9fc] select-none pb-20 relative">
      <Header showBack showSearch={false} title="My Orders" />

      {/* Filter Strip */}
      <div className="bg-white px-3 py-2.5 border-b border-[#eceef1] flex items-center justify-between text-[12px] font-semibold text-slate-700 shadow-2xs">
        <span>Showing {orders.length} orders</span>
        <button onClick={() => alert('Filter orders dialog demo')} className="flex items-center gap-1 text-[#0056c3]">
          <span className="material-symbols-outlined text-[18px]">filter_list</span>
          Filter Orders
        </button>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {orders.length > 0 ? (
          orders.map((order) => {
            const firstItem = order.items[0];
            const prod = firstItem.product;

            const formattedTotal = new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(order.totalAmount);

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-[#eceef1] shadow-2xs overflow-hidden flex flex-col transition-all hover:shadow-md group"
              >
                <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-100 flex justify-between items-center text-[11px] font-bold text-slate-500">
                  <span>ORDER ID: {order.id}</span>
                  <span>{new Date(order.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <div className="p-3.5 flex items-start gap-3">
                  <div className="w-16 h-16 bg-[#f7f9fc] rounded-lg p-1 shrink-0 border border-slate-100 flex items-center justify-center">
                    <img src={prod.image} alt="" className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-bold text-[#191c1e] line-clamp-1 group-hover:text-[#0056c3] transition-colors">
                      {prod.title}
                    </h3>
                    {order.items.length > 1 && (
                      <span className="text-[11px] font-semibold text-slate-500">
                        + {order.items.length - 1} more items
                      </span>
                    )}

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[15px] font-black text-[#191c1e]">{formattedTotal}</span>
                      
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                          order.status === 'DELIVERED'
                            ? 'bg-[#0b6b1d]/15 text-[#0b6b1d]'
                            : order.status === 'SHIPPED'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-3.5 py-2 bg-slate-50/60 border-t border-slate-100 flex justify-between items-center text-[12px] font-bold">
                  <span className="text-slate-500 font-medium text-[11px]">
                    {order.status === 'DELIVERED' ? 'Delivered on' : 'Expected Delivery'}: {new Date(order.expectedDelivery).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                  <button onClick={() => alert(`Tracking details for ${order.id}`)} className="text-[#0056c3] hover:underline">
                    Track &gt;
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center m-auto">
            <span className="material-symbols-outlined text-[48px] text-slate-300">box</span>
            <h2 className="text-[16px] font-bold text-slate-700 mt-2">No orders placed yet</h2>
            <Link href="/" className="mt-4 inline-block bg-[#0056c3] text-white text-[12px] font-bold px-4 py-2 rounded-lg">
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
