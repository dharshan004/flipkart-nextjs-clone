'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { useAuth } from '@/context/auth-context';

export default function AccountPage() {
  const { user, logout, setAuthModalOpen } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex flex-col min-h-full bg-[#f7f9fc] select-none pb-20">
        <Header showBack title="My Account" />
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center m-auto">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-[#2874f0] mb-4">
            <span className="material-symbols-outlined text-[40px]">person_off</span>
          </div>
          <h2 className="text-[18px] font-black text-[#191c1e]">You are not logged in</h2>
          <p className="text-[13px] text-slate-500 mt-1 max-w-xs">
            Login to access your orders, saved addresses, wishlist and Flipkart Plus rewards!
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="mt-6 bg-[#fb641b] hover:bg-[#e8530b] text-white font-black text-[13px] uppercase tracking-wider px-8 py-3 rounded-xl shadow-md active:scale-95 transition-all"
          >
            Login / Signup
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  const menuItems = [
    { title: 'My Orders', icon: 'package_2', subtitle: 'Check tracking & order history', href: '/account/orders', color: 'text-blue-600 bg-blue-50' },
    { title: 'Flipkart Plus Zone', icon: 'stars', subtitle: `${user.superCoins} SuperCoins available`, href: '#', color: 'text-yellow-600 bg-yellow-50' },
    { title: 'Saved Addresses', icon: 'location_on', subtitle: `${user.addresses.length} addresses saved`, href: '#', color: 'text-green-600 bg-green-50' },
    { title: 'My Wishlist', icon: 'favorite', subtitle: 'Your favorite items', href: '/', color: 'text-red-600 bg-red-50' },
    { title: 'Help Center', icon: 'support_agent', subtitle: '24x7 Customer Support', href: '#', color: 'text-purple-600 bg-purple-50' }
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#f7f9fc] select-none pb-20 relative">
      <Header showBack showSearch={false} title="My Account" />

      {/* Profile Banner */}
      <div className="bg-gradient-to-r from-[#0056c3] to-[#2874f0] p-4 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white text-[#0056c3] font-black text-[24px] flex items-center justify-center shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h1 className="text-[18px] font-black">{user.name}</h1>
              {user.isPlusMember && (
                <span className="bg-[#dbc90a] text-[#201c00] text-[9px] font-black px-1.5 py-0.5 rounded shadow-2xs not-italic tracking-wider uppercase">
                  ✦ Plus Member
                </span>
              )}
            </div>
            <span className="text-[12px] font-medium opacity-90 mt-0.5">{user.phone}</span>
            {user.email && <span className="text-[11px] opacity-80">{user.email}</span>}
          </div>
        </div>

        <button
          onClick={() => alert('Edit profile demo')}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
      </div>

      {/* SuperCoins Strip */}
      <div className="p-3">
        <div className="bg-gradient-to-r from-[#695f00] via-[#dbc90a] to-[#f9e534] rounded-xl p-3 text-[#201c00] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs text-[20px]">
              🪙
            </div>
            <div>
              <div className="text-[15px] font-black">SuperCoins: {user.superCoins}</div>
              <div className="text-[11px] font-bold opacity-85">Use coins for extra ₹100 off on checkout</div>
            </div>
          </div>
          <span className="material-symbols-outlined text-[24px] font-bold">chevron_right</span>
        </div>
      </div>

      {/* Menu Cards */}
      <div className="px-3 flex flex-col gap-2.5 mt-1">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={(e) => {
              if (item.href === '#') {
                e.preventDefault();
                alert(`${item.title} feature simulation active`);
              }
            }}
            className="bg-white p-3.5 rounded-xl border border-[#eceef1] shadow-2xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>
                <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#191c1e] group-hover:text-[#0056c3] transition-colors">
                  {item.title}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">{item.subtitle}</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[20px] group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </Link>
        ))}

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            router.push('/');
          }}
          className="mt-4 bg-white hover:bg-red-50 text-[#ba1a1a] border border-red-100 p-3.5 rounded-xl font-bold text-[13px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Logout from all devices
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
