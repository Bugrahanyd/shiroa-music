import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Orbitron } from "next/font/google";

import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";
import Footer from "@/components/Footer";

import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "SHIROA - Everything for your sound",
  description: "AI-powered music production and exclusive licensing platform.",
  keywords: ["music licensing", "AI music", "exclusive tracks", "music production", "SHIROA"],
  authors: [{ name: "SHIROA" }],
  openGraph: {
    title: "SHIROA - Everything for your sound",
    description: "AI-powered music production and exclusive licensing platform.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${orbitron.variable} font-sans antialiased theme-bg theme-text`}>
        <div className="animated-bg"></div>
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>

        <ThemeProvider>
          <AuthProvider>
            <TopNavigation />
            <Sidebar />
            <main className="ml-16 lg:ml-64 mt-16 transition-all duration-300">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
