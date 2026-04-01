import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMenu, FiX } from 'react-icons/fi';

interface NavigationProps {
  showResume?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ showResume = true }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = router.pathname === '/';

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/writing', label: 'Writing' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(href);
  };

  return (
    <nav className={`nav ${isHome ? 'nav-home' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          lunalogs
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {showResume && (
            <a
              href="/files/Rujie Yang (Luna).pdf"
              download
              className="nav-link-resume"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resume
            </a>
          )}
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <FiX className="mobile-menu-icon" />
          ) : (
            <FiMenu className="mobile-menu-icon" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
