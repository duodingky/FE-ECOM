import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { Header } from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FE-ECOM",
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
        <CartProvider>
          <div className="min-h-dvh">
            <Header />
            <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
              {children}
            </main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
