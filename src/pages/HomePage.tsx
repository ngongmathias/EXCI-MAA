import Hero from '../components/pages/home/Hero';
import About from '../components/pages/home/About';
import Services from '../components/pages/home/Services';
import Partners from '../components/pages/home/Partners';
import CompactSlideshow from '../components/common/CompactSlideshow';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Compact Slideshow Section */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <CompactSlideshow />
        </div>
      </div>
      
      <Hero />
      <About />
      <Services />
      <Partners />
    </div>
  );
}


