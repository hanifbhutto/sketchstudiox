import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import StudioCursor from '../components/layout/StudioCursor';
import { CartProvider } from '../context/CartContext';
import CartDrawer from '../components/cart/CartDrawer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Sketch Studio X | Luxury Charcoal & Graphite Art',
  description: 'Handcrafted custom portrait commissions and original artwork exhibitions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased relative">
        <CartProvider>
          <StudioCursor />
          <Navbar />
          <CartDrawer />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}