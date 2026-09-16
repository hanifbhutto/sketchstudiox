import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import ConditionalLayout from '../components/layout/ConditionalLayout';
import StudioPreloader from '../components/StudioPreloader';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Sketch Studio X | Hand-Drawn Charcoal Portraits & Fine Art Gallery',
  description: 'Commission bespoke, hand-drawn portraits of loved ones and cherished pets in pure charcoal, fine graphite, and colored pencil on 300 GSM French cotton paper.',
  keywords: [
    'handmade charcoal portraits',
    'custom pet sketch from photo',
    'buy original charcoal art',
    'bespoke family portrait drawing',
    'fine art atelier UK'
  ],
  openGraph: {
    title: 'Sketch Studio X | Hand-Drawn Charcoal Portraits & Fine Art Gallery',
    description: 'Commission bespoke, hand-drawn portraits of loved ones and cherished pets on archival cotton paper.',
    url: 'https://sketchstudiox.com',
    siteName: 'Sketch Studio X',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sketch Studio X | Fine Art Atelier',
    description: 'Commission bespoke hand-drawn charcoal portraits from your reference photos.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased relative" suppressHydrationWarning={true}>
        <CartProvider>
          <ConditionalLayout>
            <StudioPreloader />
            {children}
          </ConditionalLayout>
          <script src="//code.tidio.co/tig0gq3xxnjhc46d1ncx5iqhhcgm9nia.js" async></script>
        </CartProvider>
      </body>
    </html>
  );
}