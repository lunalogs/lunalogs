import React from 'react';
import { FaGithub, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { LuMail } from 'react-icons/lu';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: 'https://github.com/luna25y', icon: FaGithub, label: 'GitHub' },
    { href: 'https://x.com/luna25y_', icon: FaXTwitter, label: 'Twitter' },
    { href: 'https://www.linkedin.com/in/rujie-yang-7a5868268/', icon: FaLinkedin, label: 'LinkedIn' },
    { href: 'mailto:lunayang025@gmail.com', icon: LuMail, label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© {currentYear} lunalogs</span>
        
        <div className="footer-links">
          {socialLinks.map((link) => (
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
