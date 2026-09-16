import Hero from '../components/home/Hero';
import MarqueeTicker from '../components/MarqueeTicker';
import FeaturedExhibition from '../components/home/FeaturedExhibition';
import PortfolioSection from '../components/home/PortfolioSection';
import CustomSketchCTA from '../components/home/CustomSketchCTA';
import StudioPromise from '../components/StudioPromise';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

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