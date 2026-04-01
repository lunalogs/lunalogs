import React from 'react';
import { useRouter } from 'next/router';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showResumeInNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showResumeInNav = true }) => {
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <div className={`layout ${isHome ? 'layout-home' : ''}`}>
      {!isHome && <Navigation showResume={showResumeInNav} />}
      <main className={`main-content ${isHome ? 'main-content-home' : ''}`}>
        {children}
      </main>
      {!isHome && <Footer />}
    </div>
  );
};

export default Layout;
