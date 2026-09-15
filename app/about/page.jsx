import AboutContent from '../../components/AboutContent';

export const metadata = {
  title: 'Philosophy & Heritage | Sketch Studio X Fine Art Atelier',
  description: 'Discover the heritage of Sketch Studio X. We create bespoke hand-drawn portraits in pure charcoal, fine graphite, and colored pencil on archival 300 GSM French cotton paper.',
  keywords: [
    'about sketch studio x',
    'fine art atelier philosophy',
    'charcoal portrait artist heritage',
    'archival cotton paper drawing studio',
    'UK registered art studio'
  ],
  openGraph: {
    title: 'Philosophy & Heritage | Sketch Studio X Fine Art Atelier',
    description: 'Learn about our independent fine art atelier, master rendering techniques, and archival 300 GSM French cotton paper standards.',
    url: 'https://sketchstudiox.com/about',
    siteName: 'Sketch Studio X',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Philosophy & Heritage | Sketch Studio X',
    description: 'Discover the craftsmanship and heritage behind our hand-drawn portraits.',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}