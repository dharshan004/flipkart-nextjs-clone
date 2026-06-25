'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { Order } from '@/lib/types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (orderId: string) => void;
}

export function CheckoutModal({ isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const { cart, totalPrice, totalDiscount } = useCart();
  const { user, addOrder } = useAuth();

  const [method, setMethod] = useState<'UPI' | 'CARD' | 'NET_BANKING' | 'COD'>('UPI');
  const [step, setStep] = useState<'SELECT' | 'OTP' | 'PROCESSING'>('SELECT');
  const [otpVal, setOtpVal] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [upiId, setUpiId] = useState('sec@okaxis');

  if (!isOpen) return null;

  const finalAmount = totalPrice + 3; // +3 platform fee

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'COD') {
      finishPayment('COD', 'cod_' + Date.now());
      return;
    }
    setStep('OTP');
  };

  const finishPayment = (payMethod: 'UPI' | 'CARD' | 'NET_BANKING' | 'COD', payId: string) => {
    setStep('PROCESSING');
    setTimeout(() => {
      const orderId = 'OD' + Math.floor(100000000000 + Math.random() * 900000000000);
      const newOrder: Order = {
        id: orderId,
        date: new Date().toISOString(),
        items: cart.map((i) => ({
          product: i.product,
          quantity: i.quantity,
          priceAtPurchase: i.product.price,
        })),
        totalAmount: finalAmount,
        discountAmount: totalDiscount,
        paymentMethod: payMethod,
        paymentId: payId,
        deliveryAddress: user?.addresses?.[0] || {
          id: 'def',
          name: 'SEC Demo',
          phone: '9876543210',
          pincode: '560001',
          locality: 'MG Road',
          addressLine: 'Apt 402, Prestige Tower',
          city: 'Bengaluru',
          state: 'Karnataka',
          type: 'HOME',
        },
        status: 'ORDERED',
        expectedDelivery: new Date(Date.now() + 86400000 * 2).toISOString(),
      };

      addOrder(newOrder);
      onSuccess(orderId);
      setStep('SELECT');
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpVal === '1234' || otpVal === '123456') {
      finishPayment(method, 'pay_rzp_' + Math.random().toString(36).substring(7));
    } else {
      alert('Please enter simulated Bank OTP: 1234');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in select-none">
      <div className="bg-[#0c1a30] text-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-700 animate-scale-up">
        {/* Razorpay Top Branding */}
        <div className="bg-[#091425] px-6 py-4 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="bg-[#0b5cff] text-white font-black px-2 py-0.5 rounded text-[14px] italic tracking-wider">
              RZP
            </div>
            <span className="font-bold text-[14px] tracking-wide">Razorpay Trusted Checkout</span>
          </div>
          <button
            onClick={() => {
              if (step !== 'PROCESSING') onClose();
            }}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Merchant Summary Bar */}
        <div className="bg-[#112442] px-6 py-3 flex justify-between items-center text-[13px]">
          <div>
            <span className="text-slate-300 block text-[11px]">Paying to</span>
            <strong className="text-white font-bold">Flipkart Internet Pvt Ltd</strong>
          </div>
          <div className="text-right">
            <span className="text-slate-300 block text-[11px]">Amount</span>
            <strong className="text-[#38ef7d] text-[18px] font-black font-mono">
              ₹{finalAmount.toLocaleString('en-IN')}
            </strong>
          </div>
        </div>

        {step === 'PROCESSING' ? (
          <div className="p-12 flex flex-col items-center justify-center text-center my-auto animate-pulse">
            <span className="material-symbols-outlined text-[64px] text-[#38ef7d] animate-spin">
              sync
            </span>
            <h3 className="text-[18px] font-black mt-4">Authorizing Payment...</h3>
            <p className="text-[12px] text-slate-400 mt-1">Please do not refresh or close this window.</p>
          </div>
        ) : step === 'OTP' ? (
          <div className="p-6 bg-white text-slate-900 rounded-t-2xl mt-2">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0b5cff] text-[28px]">account_balance</span>
                <div>
                  <h4 className="font-bold text-[14px] leading-tight">HDFC Bank 3D-Secure</h4>
                  <span className="text-[10px] text-slate-500">OTP Verification</span>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=80&auto=format&fit=crop&q=80" alt="" className="h-6 w-12 object-cover rounded opacity-80 hidden" />
            </div>

            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              <p className="text-[12px] text-slate-600">
                An OTP has been sent to your registered mobile number ending with <strong>**210</strong> for transaction of ₹{finalAmount.toLocaleString('en-IN')}.
              </p>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[11px] font-bold">
                  <label className="text-slate-500 uppercase">Enter 4-Digit OTP</label>
                  <span className="text-[#0b6b1d] bg-green-50 px-2 py-0.5 rounded">Simulated: 1234</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpVal}
                  onChange={(e) => setOtpVal(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • •"
                  className="w-full border-2 border-slate-300 focus:border-[#0b5cff] rounded-xl py-2.5 px-4 text-[22px] font-black tracking-[0.5em] text-center outline-none"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="mt-2 bg-[#0b5cff] hover:bg-blue-700 text-white font-black text-[14px] uppercase tracking-wider py-3 rounded-xl shadow-md active:scale-95 transition-all"
              >
                Submit &amp; Pay ₹{finalAmount.toLocaleString('en-IN')}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col flex-1 bg-[#0f203c] p-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
              Select Payment Option
            </span>

            <div className="flex flex-col gap-2">
              {/* UPI Option */}
              <div
                onClick={() => setMethod('UPI')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col gap-3 ${
                  method === 'UPI'
                    ? 'bg-[#18325c] border-[#0b5cff] shadow-md'
                    : 'bg-[#122647]/60 border-slate-700 hover:bg-[#122647]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#38ef7d] text-[24px]">qr_code_scanner</span>
                    <span className="font-bold text-[14px]">UPI / QR (Instant)</span>
                  </div>
                  <input type="radio" checked={method === 'UPI'} readOnly className="accent-[#0b5cff]" />
                </div>

                {method === 'UPI' && (
                  <div className="pl-9 pt-1 flex flex-col gap-2.5 border-t border-slate-700/50 mt-1 animate-fade-in">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => alert('Google Pay simulated')} className="flex-1 bg-black/40 hover:bg-black/60 py-2 rounded-lg text-[11px] font-bold border border-slate-600">
                        GPay
                      </button>
                      <button type="button" onClick={() => alert('PhonePe simulated')} className="flex-1 bg-[#5f259f]/40 hover:bg-[#5f259f]/60 py-2 rounded-lg text-[11px] font-bold border border-purple-500/50">
                        PhonePe
                      </button>
                      <button type="button" onClick={() => alert('Paytm simulated')} className="flex-1 bg-[#00b9f1]/40 hover:bg-[#00b9f1]/60 py-2 rounded-lg text-[11px] font-bold border border-sky-500/50">
                        Paytm
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter UPI ID (user@bank)"
                        className="flex-1 bg-black/30 border border-slate-600 px-3 py-1.5 rounded-lg text-[12px] font-mono outline-none focus:border-[#0b5cff]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Option */}
              <div
                onClick={() => setMethod('CARD')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col gap-3 ${
                  method === 'CARD'
                    ? 'bg-[#18325c] border-[#0b5cff] shadow-md'
                    : 'bg-[#122647]/60 border-slate-700 hover:bg-[#122647]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-400 text-[24px]">credit_card</span>
                    <span className="font-bold text-[14px]">Credit / Debit Card</span>
                  </div>
                  <input type="radio" checked={method === 'CARD'} readOnly className="accent-[#0b5cff]" />
                </div>

                {method === 'CARD' && (
                  <div className="pl-9 pt-2 flex flex-col gap-2 border-t border-slate-700/50 mt-1 animate-fade-in text-[12px]">
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNum}
                      onChange={(e) => setCardNum(e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '))}
                      placeholder="Card Number 4532 •••• •••• ••••"
                      className="bg-black/30 border border-slate-600 px-3 py-2 rounded-lg font-mono outline-none focus:border-[#0b5cff]"
                    />
                    <div className="flex gap-2">
                      <input type="text" placeholder="MM/YY" maxLength={5} className="w-1/2 bg-black/30 border border-slate-600 px-3 py-1.5 rounded-lg font-mono outline-none focus:border-[#0b5cff]" />
                      <input type="password" placeholder="CVV" maxLength={3} className="w-1/2 bg-black/30 border border-slate-600 px-3 py-1.5 rounded-lg font-mono outline-none focus:border-[#0b5cff]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Net Banking */}
              <div
                onClick={() => setMethod('NET_BANKING')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  method === 'NET_BANKING'
                    ? 'bg-[#18325c] border-[#0b5cff]'
                    : 'bg-[#122647]/60 border-slate-700 hover:bg-[#122647]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sky-400 text-[24px]">account_balance</span>
                  <span className="font-bold text-[14px]">Net Banking (All Banks)</span>
                </div>
                <input type="radio" checked={method === 'NET_BANKING'} readOnly className="accent-[#0b5cff]" />
              </div>

              {/* COD */}
              <div
                onClick={() => setMethod('COD')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  method === 'COD'
                    ? 'bg-[#18325c] border-[#0b5cff]'
                    : 'bg-[#122647]/60 border-slate-700 hover:bg-[#122647]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-400 text-[24px]">payments</span>
                  <span className="font-bold text-[14px]">Cash on Delivery</span>
                </div>
                <input type="radio" checked={method === 'COD'} readOnly className="accent-[#0b5cff]" />
              </div>
            </div>

            <button
              onClick={handleProceed}
              className="mt-6 bg-[#38ef7d] hover:bg-[#2dd46c] text-[#091425] font-black text-[14px] uppercase tracking-wider py-3.5 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined font-bold">lock</span>
              Pay ₹{finalAmount.toLocaleString('en-IN')} Securely
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
