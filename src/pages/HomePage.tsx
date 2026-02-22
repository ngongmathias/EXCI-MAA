import Hero from '../components/pages/home/Hero';
import About from '../components/pages/home/About';
import Services from '../components/pages/home/Services';
import Partners from '../components/pages/home/Partners';
import Accreditations from '../components/pages/home/Accreditations';
import Meta from '../components/common/Meta';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Meta
        title="Home"
        description="EXCI-MAA is a premier international firm offering professional accounting, audit, tax, and advisory services across Africa, Europe, and North America."
      />
      <Hero />
      <About />
      <Services />
      <Partners />
      <Accreditations />
    </div>
  );
}


