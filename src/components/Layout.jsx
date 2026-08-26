import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      {/* pt: 60px navbar + 36px top bar on md+, 60px on mobile */}
      <main className="flex-1 pt-[3.75rem] md:pt-[calc(2.25rem+3.75rem)]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
