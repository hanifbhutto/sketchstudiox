import HowItWorks from '../components/home/HowItWorks';
import CustomSketchCTA from '../components/home/CustomSketchCTA';
import FeaturedExhibition from '../components/home/FeaturedExhibition';
import Hero from '../components/home/Hero';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedExhibition />
      <CustomSketchCTA/>
      <HowItWorks/>
      <Testimonials/>
      <Newsletter/>
    </>
  );
}