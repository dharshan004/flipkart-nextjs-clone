import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Flipkart E-commerce Replica",
  description: "High-density mobile e-commerce replica generated via Stitch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
      </head>
      <body className="min-h-screen bg-slate-900 flex justify-center items-start md:py-8 font-sans antialiased selection:bg-[#2874f0] selection:text-white">
        <AuthProvider>
          <CartProvider>
            {/* Mobile Viewport Shell */}
            <div className="w-full max-w-[430px] min-h-[100dvh] md:min-h-[880px] bg-[#f7f9fc] md:rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] md:border-[8px] md:border-slate-800 flex flex-col relative overflow-hidden">
              {/* Top Phone speaker/notch bar for desktop aesthetic */}
              <div className="hidden md:flex justify-center items-center h-6 bg-slate-800 w-full select-none">
                <div className="w-24 h-2 bg-slate-700 rounded-full"></div>
              </div>
              
              <div className="flex-1 flex flex-col pb-16 overflow-y-auto no-scrollbar">
                {children}
              </div>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
