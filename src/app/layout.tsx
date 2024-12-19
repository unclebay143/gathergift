import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AppProvider } from "./providers";
import { getCurrentUser } from "@/service/users/user.server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GatherGift - Collaborative Wishlist Platform",
  description:
    "Create, share, and contribute to wishlists for any occasion with GatherGift.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en' className='scroll-smooth'>
      <body className={inter.className}>
        <div className='relative min-h-screen flex flex-col'>
          <Toaster />
          <AppProvider currentUser={currentUser}>
            <main className='flex-grow'>{children}</main>
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
