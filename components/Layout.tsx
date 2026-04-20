import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="site-shell">
      <Navigation />
      <main className="site-main">{children}</main>
    </div>
  );
};

export default Layout;
