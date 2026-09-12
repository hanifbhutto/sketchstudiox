'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer'; // Agar aapke paas footer component hai
import CartDrawer from '../cart/CartDrawer';
import StudioCursor from './StudioCursor';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    // Admin routes par koi public Navbar ya Footer nahi aayega
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
        <StudioCursor />
          <CartDrawer />
      {children}
      <Footer />
    </>
  );
}