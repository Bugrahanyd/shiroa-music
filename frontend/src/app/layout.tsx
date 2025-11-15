import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Orbitron } from "next/font/google";

import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

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
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${orbitron.variable} font-sans antialiased`}>
        <div className="animated-bg"></div>
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>

        <ThemeProvider>
          <AuthProvider>
            <Navigation />
            {children}
            <Footer />
            <ThemeSwitcher />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
