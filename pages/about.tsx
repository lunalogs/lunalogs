import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { FiDownload, FiMapPin, FiMail } from 'react-icons/fi';
import { FaGithub, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import ResumeArchive from '../components/ResumeArchive';
import { resumeFilePath, socialLinks } from '../lib/site';

const About: React.FC = () => {
  const { t } = useTranslation('common');

  const profiles = [
    { href: socialLinks.github, icon: FaGithub, label: 'GitHub' },
    { href: socialLinks.x, icon: FaXTwitter, label: 'Twitter' },
    { href: socialLinks.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
    { href: socialLinks.email, icon: FiMail, label: 'Email' },
  ];

  return (
    <div className="about-container">
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">{t('about.pageTitle', 'About')}</h1>
      </header>

      <div className="about-section">
        {/* Main Introduction */}
        <p className="about-intro">
          {t('about.intro', 'I am a software engineer with an MBA, working at the intersection of technology and business. I have built internal tools at Toyota Systems, coordinated iOS projects, and spent years navigating both code and markets. Currently exploring AI agents and onchain applications.')}
        </p>

        {/* Details Grid */}
        <div className="about-details">
          <div className="about-block">
            <h3>{t('about.locationLabel', 'Location')}</h3>
            <p>
              <FiMapPin style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              {t('about.location', 'Toronto, Canada')}
            </p>
          </div>

          <div className="about-block">
            <h3>{t('about.focusLabel', 'Current Focus')}</h3>
            <p>{t('about.focus', 'AI × Crypto. Building useful products. Learning in public.')}</p>
          </div>

          <div className="about-block">
            <h3>{t('about.backgroundLabel', 'Background')}</h3>
            <p>{t('about.background', 'Engineering at Toyota Systems, MBA from Laurentian University, fluent in Chinese, Japanese, and English.')}</p>
          </div>

          <div className="about-block">
            <h3>{t('about.connectLabel', 'Connect')}</h3>
            <div className="about-links">
              {profiles.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="about-link"
                >
                  <link.icon size={16} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Resume Download - Secondary Action */}
        <a
          href={resumeFilePath}
          download
          className="resume-download"
        >
          <FiDownload size={14} />
          {t('about.downloadResume', 'Download Resume')}
        </a>
      </div>

      <ResumeArchive />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default About;
