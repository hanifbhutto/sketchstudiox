import dynamic from 'next/dynamic';
import Hero from '../components/home/Hero';
import MarqueeTicker from '../components/MarqueeTicker';

// Below-the-fold heavy components lazily loaded for instant initial render
const FeaturedExhibition = dynamic(() => import('../components/home/FeaturedExhibition'));
const PortfolioSection = dynamic(() => import('../components/home/PortfolioSection'));
const CustomSketchCTA = dynamic(() => import('../components/home/CustomSketchCTA'));
const StudioPromise = dynamic(() => import('../components/StudioPromise'));
const HowItWorks = dynamic(() => import('../components/home/HowItWorks'));
const Testimonials = dynamic(() => import('../components/home/Testimonials'));
const Newsletter = dynamic(() => import('../components/home/Newsletter'));

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeTicker />
      <FeaturedExhibition />
      <PortfolioSection />
      <CustomSketchCTA />
      <StudioPromise />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </>
  );
}