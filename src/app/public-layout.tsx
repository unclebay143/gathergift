import Footer from "@/components/public/Footer";
import Navigation from "@/components/public/Navigation";
import React from "react";

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};
