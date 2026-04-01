import React from 'react';
import { FaGithub, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { LuMail } from 'react-icons/lu';
import { socialLinks } from '../lib/site';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: socialLinks.github, icon: FaGithub, label: 'GitHub' },
    { href: socialLinks.x, icon: FaXTwitter, label: 'Twitter' },
    { href: socialLinks.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
    { href: socialLinks.email, icon: LuMail, label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© {currentYear} lunalogs</span>
        
        <div className="footer-links">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="footer-link"
              aria-label={link.label}
            >
              <link.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
