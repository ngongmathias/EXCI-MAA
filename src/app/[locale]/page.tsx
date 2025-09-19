import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Training from '@/components/Training';
import Contact from '@/components/Contact';
import Partners from '@/components/Partners';
import Offices from '@/components/Offices';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Training />
      <Partners />
      <Offices />
      <Contact />
    </div>
  );
}
