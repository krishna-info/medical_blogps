import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/features/CookieConsent";
import ExitPopup from "@/components/features/ExitPopup";
import LiveChat from "@/components/features/LiveChat";

export const metadata: Metadata = {
  title: "Medical Blog",
  description: "Trusted Medical Insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-sans antialiased flex flex-col min-h-screen pt-[72px] md:pt-[76px]`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieConsent />
        <ExitPopup />
        <LiveChat />
      </body>
    </html>
  );
}
