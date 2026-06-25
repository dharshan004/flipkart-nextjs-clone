'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';

export function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, login } = useAuth();
  const [inputVal, setInputVal] = useState('');
  const [step, setStep] = useState<'INPUT' | 'OTP'>('INPUT');
  const [otp, setOtp] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim().length >= 3) {
      setStep('OTP');
    } else {
      alert('Please enter a valid Mobile Number or Email ID');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      login(inputVal);
      setStep('INPUT');
      setInputVal('');
      setOtp('');
    } else {
      alert('Please enter simulated OTP: 1234');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in select-none">
      <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl flex flex-col relative animate-scale-up">
        {/* Flipkart Blue Header Banner */}
        <div className="bg-[#2874f0] text-white p-6 flex justify-between items-start relative overflow-hidden">
          <div className="z-10">
            <h2 className="text-[20px] font-black tracking-tight leading-none">Login</h2>
            <p className="text-[12px] font-medium text-blue-100 mt-2 leading-snug">
              Get access to your Orders, Wishlist and Flipkart Plus SuperCoins
            </p>
          </div>
          <button
            onClick={() => {
              setAuthModalOpen(false);
              setStep('INPUT');
            }}
            className="z-10 text-white/80 hover:text-white p-1 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'INPUT' ? (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                  Enter Mobile Number or Email
                </label>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="+91 9876543210 or name@email.com"
                  className="w-full border-b-2 border-slate-200 focus:border-[#2874f0] py-2 text-[14px] font-bold text-[#191c1e] outline-none transition-colors"
                  autoFocus
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-normal mt-2">
                By continuing, you agree to Flipkart Replica's <span className="text-[#2874f0] font-bold">Terms of Use</span> and <span className="text-[#2874f0] font-bold">Privacy Policy</span>.
              </p>

              <button
                type="submit"
                className="mt-2 bg-[#fb641b] hover:bg-[#f3570c] text-white font-black text-[14px] uppercase tracking-wider py-3 rounded-xl shadow-md active:scale-95 transition-all"
              >
                Request OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              <div className="text-[13px] font-medium text-slate-700">
                Please enter the 4-digit verification code sent to <strong className="text-[#2874f0]">{inputVal}</strong>.
                <button
                  type="button"
                  onClick={() => setStep('INPUT')}
                  className="text-[11px] font-bold text-[#2874f0] ml-2 block mt-1"
                >
                  Change
                </button>
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                    One Time Password (OTP)
                  </label>
                  <span className="text-[10px] font-bold text-[#0b6b1d] bg-green-50 px-2 py-0.5 rounded">
                    Simulated: 1234
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • •"
                  className="w-full border-2 border-slate-200 focus:border-[#2874f0] rounded-xl py-2 px-4 text-[20px] font-black tracking-[0.5em] text-center text-[#191c1e] outline-none transition-colors"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="mt-4 bg-[#2874f0] hover:bg-[#1f6feb] text-white font-black text-[14px] uppercase tracking-wider py-3 rounded-xl shadow-md active:scale-95 transition-all"
              >
                Verify &amp; Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
