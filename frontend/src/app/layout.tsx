import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Orbitron } from "next/font/google";

import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { LanguageProvider } from "@/lib/language-context";
import { ErrorBoundary } from "@/lib/error-boundary";
import LayoutClient from "./layout-client";

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
      <body className={`${poppins.variable} ${orbitron.variable} font-sans antialiased theme-bg theme-text min-h-screen flex flex-col`}>
        <div className="animated-bg"></div>
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>

        <ErrorBoundary>
          <LanguageProvider>
            <ThemeProvider>
              <AuthProvider>
                <div className="flex-grow flex flex-col">
                  <LayoutClient>{children}</LayoutClient>
                </div>
              </AuthProvider>
            </ThemeProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
