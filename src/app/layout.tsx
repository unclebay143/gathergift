import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AppProvider } from "./providers";

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
          <Toaster />
          <AppProvider>
            <main className='flex-grow'>{children}</main>
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
