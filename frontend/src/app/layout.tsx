import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Orbitron } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import Navigation from "@/components/Navigation";
import MouseGlow from "@/components/MouseGlow";
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
  description: "AI-powered music production and exclusive licensing platform. Discover high-quality, licensed music tracks from top producers.",
  keywords: ["music licensing", "exclusive tracks", "music production", "AI music", "beats", "instrumentals"],
  authors: [{ name: "SHIROA" }],
  openGraph: {
    title: "SHIROA - Everything for your sound",
    description: "AI-powered music production and exclusive licensing platform",
    type: "website",
    locale: "en_US",
    siteName: "SHIROA"
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIROA - Everything for your sound",
    description: "AI-powered music production and exclusive licensing platform"
  }
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
        <MouseGlow />
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
