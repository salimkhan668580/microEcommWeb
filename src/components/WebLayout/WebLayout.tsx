import React from "react";
import Footer from "./Footer";
import WebHeader from "./WebHeader";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <WebHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
