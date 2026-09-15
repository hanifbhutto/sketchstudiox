import ShopContent from '../../components/ShopContent';

export const metadata = {
  title: 'Fine Art Gallery Exhibition | Original Charcoal & Graphite Art | Sketch Studio X',
  description: 'Explore our permanent studio vault of authenticated, hand-drawn charcoal portraits, pet studies, and classical figures on archival 300 GSM French cotton paper.',
  keywords: [
    'buy original charcoal art online',
    'hand-drawn portrait gallery',
    'original graphite art for sale',
    'bespoke pet portraits gallery',
    'fine art exhibition UK'
  ],
  openGraph: {
    title: 'Fine Art Gallery Exhibition | Sketch Studio X',
    description: 'Explore authentic charcoal and graphite studies hand-drawn on archival cotton paper.',
    url: 'https://sketchstudiox.com/shop',
    siteName: 'Sketch Studio X',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery Exhibition | Sketch Studio X',
    description: 'Browse curated original charcoal and graphite masterpieces.',
  },
};

export default function ShopPage() {
  return <ShopContent />;
}