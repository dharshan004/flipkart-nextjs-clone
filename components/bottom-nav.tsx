'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/cart-context';

export function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navItems = [
    { name: 'Home', icon: 'home', href: '/' },
    { name: 'Categories', icon: 'grid_view', href: '/search' },
    { name: 'Notifications', icon: 'notifications', href: '#' },
    { name: 'Account', icon: 'person', href: '/account' },
    { name: 'Cart', icon: 'shopping_cart', href: '/cart', badge: totalItems }
  ];

  return (
    <nav className="fixed md:absolute bottom-0 left-0 right-0 z-40 bg-white border-t border-[#eceef1] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] h-14 px-2 flex items-center justify-around select-none">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href === '/search' && pathname?.startsWith('/search')) ||
          (item.href === '/account' && pathname?.startsWith('/account'));

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => {
              if (item.href === '#') {
                e.preventDefault();
                alert(`${item.name} section demo`);
              }
            }}
            className={`flex flex-col items-center justify-center flex-1 h-full relative group transition-all ${
              isActive ? 'text-[#0056c3]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span
                className={`material-symbols-outlined text-[24px] transition-transform duration-200 group-active:scale-90 ${
                  isActive ? 'font-bold fill-current' : 'font-normal'
                }`}
              >
                {item.icon}
              </span>
              {item.badge ? (
                <span className="absolute -top-1 -right-2 bg-[#ba1a1a] text-white text-[9px] font-black min-w-[15px] h-[15px] px-1 rounded-full flex items-center justify-center animate-bounce">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              ) : null}
            </div>
            <span
              className={`text-[10px] tracking-tight mt-0.5 ${
                isActive ? 'font-bold' : 'font-medium'
              }`}
            >
              {item.name}
            </span>
            {isActive && (
              <span className="absolute top-0 w-8 h-0.5 bg-[#0056c3] rounded-full animate-fade-in" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
