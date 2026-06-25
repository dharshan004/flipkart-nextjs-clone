'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order, Address } from '@/lib/types';
import { PRODUCTS } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  orders: Order[];
  login: (phoneOrEmail: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  addOrder: (order: Order) => void;
  updateUser: (data: Partial<User>) => void;
}

const DEFAULT_USER: User = {
  id: 'usr_sec_demo',
  name: 'SEC Demo User',
  phone: '+91 98765 43210',
  email: 'sec@flipkart.demo',
  isPlusMember: true,
  superCoins: 540,
  addresses: [
    {
      id: 'addr_1',
      name: 'SEC',
      phone: '9876543210',
      pincode: '560001',
      locality: 'MG Road',
      addressLine: 'Apt 402, Prestige Tower, Near Metro Station',
      city: 'Bengaluru',
      state: 'Karnataka',
      type: 'HOME',
      isDefault: true,
    },
  ],
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'OD12948190248102',
    date: '2026-06-20T14:30:00Z',
    items: [
      {
        product: PRODUCTS[2], // Sony Headphones
        quantity: 1,
        priceAtPurchase: 26990,
      },
    ],
    totalAmount: 26990,
    discountAmount: 8000,
    paymentMethod: 'UPI',
    paymentId: 'pay_sim_9812490124',
    deliveryAddress: DEFAULT_USER.addresses[0],
    status: 'DELIVERED',
    expectedDelivery: '2026-06-22T18:00:00Z',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('fk_replica_user');
      const storedOrders = localStorage.getItem('fk_replica_orders');
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch (e) {
      console.error('Failed to load auth from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      if (user) {
        localStorage.setItem('fk_replica_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('fk_replica_user');
      }
      localStorage.setItem('fk_replica_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save auth to localStorage', e);
    }
  }, [user, orders, isInitialized]);

  const login = (phoneOrEmail: string) => {
    const newUser: User = {
      ...DEFAULT_USER,
      phone: phoneOrEmail.includes('@') ? DEFAULT_USER.phone : phoneOrEmail,
      email: phoneOrEmail.includes('@') ? phoneOrEmail : DEFAULT_USER.email,
    };
    setUser(newUser);
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    if (user) {
      setUser({
        ...user,
        superCoins: user.superCoins + Math.floor(order.totalAmount / 100),
      });
    }
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        login,
        logout,
        isAuthModalOpen,
        setAuthModalOpen,
        addOrder,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
