import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dingky's store",
  description: "A small e-commerce starter built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-zinc-50 text-zinc-950 antialiased`}
      >
        <AppRouterCacheProvider>
          <Providers>
            <CartProvider>
              <div className="min-h-dvh">
                <Suspense fallback={<div>Loading header...</div>}>
                  <Header />
                </Suspense>

                <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
                  {children}
                </main>
              </div>
              <Footer />
            </CartProvider>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
