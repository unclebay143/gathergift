import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GatherGift - Collaborative Wishlist Platform",
  description:
    "Create, share, and contribute to wishlists for any occasion with GatherGift.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className={inter.className}>
        <div className='relative min-h-screen flex flex-col'>
          <Navigation />
          <Toaster />
          <main className='flex-grow'>{children}</main>
          <Footer />
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              className='snowflake'
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </body>
    </html>
  );
}
