import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  FiBookOpen,
  FiDownload,
  FiFolder,
  FiGrid,
  FiMenu,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { resumeFilePath, socialLinks } from '../lib/site';

const Navigation: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('nav.home', 'Home'), icon: FiGrid },
    { href: '/projects', label: t('nav.projects', 'Projects'), icon: FiFolder },
    { href: '/writing', label: t('nav.writing', 'Writing'), icon: FiBookOpen },
    { href: '/about', label: t('nav.about', 'About'), icon: FiUser },
  ];

  const quickLinks = [
    { href: socialLinks.github, label: 'GitHub', icon: FaGithub },
    { href: socialLinks.x, label: 'X', icon: FaXTwitter },
    { href: socialLinks.linkedin, label: 'LinkedIn', icon: FaLinkedin },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(href);
  };

  const currentItem =
    navItems.find((item) => isActive(item.href)) ?? navItems[0];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="mobile-topbar">
        <Link href="/" className="mobile-brand" onClick={closeMenu}>
          <span className="brand-mark">l</span>
          <span className="mobile-brand-copy">
            <strong>lunalogs</strong>
            <span>{currentItem.label}</span>
          </span>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!mobileMenuOpen}
      />

      <aside className={`sidebar ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="sidebar-top">
          <Link href="/" className="sidebar-brand sidebar-brand-wordmark" onClick={closeMenu}>
            <span className="sidebar-brand-title">lunalogs</span>
          </Link>

          <nav className="sidebar-nav" aria-label="Primary">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${isActive(item.href) ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <span className="sidebar-link-icon">
                    <Icon size={16} />
                  </span>
                  <span className="sidebar-link-copy">
                    <span>{item.label}</span>
                    <small>{item.href === '/' ? 'index' : item.href.replace('/', '')}</small>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <a href={resumeFilePath} download className="sidebar-utility">
            <FiDownload size={15} />
            <span>{t('nav.resume', 'Resume')}</span>
          </a>

          <div className="sidebar-socials">
            {quickLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="sidebar-social-link"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
