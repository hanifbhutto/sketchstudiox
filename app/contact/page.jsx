import ContactContent from '../../components/ContactContent';

export const metadata = {
  title: 'Client Concierge & Private Inquiries | Sketch Studio X',
  description: 'Connect directly with Sketch Studio X fine art atelier desk. Inquire about custom charcoal portraits, pet sketches, original gallery acquisitions, and multi-subject heirlooms.',
  keywords: [
    'contact sketch studio x',
    'commission custom portrait inquiry',
    'fine art atelier contact desk',
    'charcoal portrait order support',
    'UK art studio communications'
  ],
  openGraph: {
    title: 'Client Concierge & Private Inquiries | Sketch Studio X',
    description: 'Inquire about custom hand-drawn portraits, pet sketches, and original gallery acquisitions.',
    url: 'https://sketchstudiox.com/contact',
    siteName: 'Sketch Studio X',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Sketch Studio X | Fine Art Atelier',
    description: 'Get in touch with our master drawing desk for custom portrait commissions.',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}