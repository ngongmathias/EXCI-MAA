import Hero from '../components/pages/home/Hero';
import About from '../components/pages/home/About';
import Services from '../components/pages/home/Services';
import Partners from '../components/pages/home/Partners';
import Accreditations from '../components/pages/home/Accreditations';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Partners />
      <Accreditations />
    </div>
  );
}


