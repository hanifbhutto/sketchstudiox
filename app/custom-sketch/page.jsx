import CustomSketchContent from '../../components/CustomSketchContent';

export const metadata = {
  title: 'Commission Custom Charcoal Portrait | Sketch Studio X Fine Art Atelier',
  description: 'Commission a bespoke hand-drawn portrait of loved ones or cherished pets from your photo. Select from 7 canvas sizes, subject counts up to 10, and live database pricing.',
  keywords: [
    'commission custom portrait online',
    'custom charcoal drawing from photo',
    'bespoke pet portrait commission',
    'hand-drawn family portrait UK',
    'live price calculator art studio'
  ],
  openGraph: {
    title: 'Commission Custom Portrait | Sketch Studio X',
    description: 'Turn your reference photos into hand-rendered charcoal and graphite masterpieces.',
    url: 'https://sketchstudiox.com/custom-sketch',
    siteName: 'Sketch Studio X',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commission Custom Sketch | Sketch Studio X',
    description: 'Order your bespoke hand-drawn portrait with live pricing and secure photo upload.',
  },
};

export default function CustomSketchPage() {
  return <CustomSketchContent />;
}