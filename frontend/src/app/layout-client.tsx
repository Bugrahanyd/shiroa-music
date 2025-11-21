'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import TopNavigation from '@/components/TopNavigation';
import Footer from '@/components/Footer';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGatePage = pathname === '/';

  if (isGatePage) {
    return <>{children}</>;
  }

  return (
    <>
      <TopNavigation />
      <Sidebar />
      <main className="mt-16 pb-20 md:pb-0 container mx-auto px-4 max-w-7xl">
        {children}
      </main>
      <Footer />
    </>
  );
}
