import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import ConditionalLayout from '../components/layout/ConditionalLayout';

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
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </CartProvider>
      </body>
    </html>
  );
}