import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FiMenu, FiX } from 'react-icons/fi';
import { resumeFilePath } from '../lib/site';

const Navigation: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('nav.home', 'Home') },
    { href: '/projects', label: t('nav.projects', 'Projects') },
    { href: '/writing', label: t('nav.writing', 'Writing') },
    { href: '/about', label: t('nav.about', 'About') },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(href);
  };

  return (
    <nav className="nav">
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
          
          <a
            href={resumeFilePath}
            download
            className="nav-link-resume"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.resume', 'Resume')}
          </a>
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
