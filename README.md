#  Flipkart E-commerce Replica (Next.js 16 + App Router)

A high-density, high-velocity e-commerce web application replicating the modern Flipkart smartphone browsing experience. Engineered with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Client State Management**, featuring simulated **OTP Authentication**, realistic **Razorpay Payment Gateway Checkouts**, and real-time **Order Tracking History**.

![Flipkart Replica Banner](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80)

---

##  Live Demo & Screenshots

- **Live Web App**: [https://your-custom-link.vercel.app](https://your-custom-link.vercel.app) *(Replace with your Vercel deployment URL)*
- **GitHub Repository**: [https://github.com/yourusername/flipkart-nextjs-clone](https://github.com/yourusername/flipkart-nextjs-clone)

---

##  Key Technical Features

### 1. Modern Frontend Architecture
- **Next.js 16 App Router**: Server-side static generation (SSG) combined with dynamic client components for blazing-fast page loads (`✓ Compiled in 2.9s`).
- **React 19**: Leverages the latest React concurrent features and custom hooks.
- **Tailwind CSS v4**: Ultra-clean, responsive fluid layout tokens styled with custom Flipkart brand hex codes (`#2874f0`, `#ffeb3b`, `#388e3c`).
- **Responsive Smartphone Shell**: Renders inside a sleek smartphone viewport frame with notch speaker and drop shadows on desktop screens, while fluidly filling 100% viewport width on mobile devices.

### 2. Client State & Cart Management (`Context API`)
- Global `CartContext` synchronized with `localStorage` persistence.
- Real-time computation of MRP totals, discount savings, delivery fee waivers, and animated badge counters.

### 3. Simulated Authentication & User Profiles (`/account`)
- Slide-over Flipkart OTP login modal (`Simulated OTP: 1234`).
- Persistent user sessions tracking **Flipkart Plus Membership** rewards and dynamic **SuperCoins** balances (`🪙 540 Coins`).

### 4. Realistic Razorpay Checkout Gateway (`/cart`)
- Authentic multi-tab checkout modal simulating **Razorpay Trusted Checkout**.
- Supports simulated **UPI QR Scanning**, **GPay/PhonePe deep links**, **Card number formatting** with auto brand recognition (Visa/Mastercard/RuPay), and 3D-Secure Bank SMS OTP verification.

### 5. Dynamic Order Tracking History (`/account/orders`)
- Placed transactions automatically generate structured order entities stored in client state.
- Chronological order history with delivery timelines and status indicator pills (`ORDERED`, `PACKED`, `SHIPPED`, `DELIVERED`).

---

##  Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16.2.9 (App Router) |
| **Library** | React 19.2.4 |
| **Styling** | Tailwind CSS v4, PostCSS |
| **Typography & Icons** | Google Fonts (Inter), Material Symbols Outlined |
| **State Management** | React Context API, Web LocalStorage API |
| **Deployment** | Vercel Edge Network |

---

##  Project Structure

```text
├── app/
│   ├── account/          # Account dashboard & order tracking pages
│   ├── cart/             # Shopping cart & checkout flow
│   ├── product/[id]/     # Dynamic product detail & specification pages
│   ├── search/           # Search listing, sorting & filter pages
│   ├── layout.tsx        # Global phone viewport wrapper & providers
│   └── page.tsx          # Home landing page with promotional banners
├── components/
│   ├── auth-modal.tsx    # Slide-over OTP authentication modal
│   ├── bottom-nav.tsx    # Mobile sticky navigation footer
│   ├── checkout-modal.tsx# Razorpay payment gateway popup
│   ├── header.tsx        # Sticky search bar & cart badge header
│   └── product-card.tsx  # Reusable product grid component
├── context/              # Cart & Auth React Context state providers
└── lib/                  # TypeScript interfaces & rich product mock data
```

---

##  Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/flipkart-nextjs-clone.git
   cd flipkart-nextjs-clone
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

