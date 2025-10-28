import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const Layout: FC = () => {
  const { pathname } = useLocation();
  const hideHeader = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {!hideHeader && <WhatsAppButton />}
    </div>
  );
};

export default Layout;
