import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import { FiArrowUpRight, FiDownload, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import ResumeArchive from '../components/ResumeArchive';
import { resumeFilePath, socialLinks } from '../lib/site';

const About: React.FC = () => {
  const { t } = useTranslation('common');
  const focusLines = [
    t('about.focusLineOne', 'AI × Crypto.'),
    t('about.focusLineTwo', 'Building useful products.'),
    t('about.focusLineThree', 'Learning in public.'),
  ];
  const skillItems = [
    'Software Engineering',
    'Enterprise Systems',
    'Product Thinking',
    'Market Research',
    'AI Workflows',
    'Crypto Research',
    'Business Analysis',
    'Cross-cultural Communication',
  ];

  const profiles = [
    { href: socialLinks.github, icon: FaGithub, label: 'GitHub', meta: 'Code' },
    { href: socialLinks.x, icon: FaXTwitter, label: 'Twitter', meta: 'Notes' },
    { href: socialLinks.linkedin, icon: FaLinkedin, label: 'LinkedIn', meta: 'Career' },
    { href: socialLinks.email, icon: FiMail, label: 'Email', meta: 'Direct' },
  ];

  return (
    <div className="page-shell about-page">
      <header className="page-header-block">
        <p className="page-kicker">Profile</p>
        <h1 className="page-title-display">{t('about.pageTitle', 'About')}</h1>
        <p className="page-intro">
          {t(
            'about.intro',
            'I am a software engineer with an MBA, working at the intersection of technology and business. I have built internal tools at Toyota Systems, coordinated iOS projects, and spent years navigating both code and markets. Currently exploring AI agents and onchain applications.',
          )}
        </p>
      </header>

      <section className="about-overview-grid">
        <article className="content-block about-summary-panel">
          <div className="block-label">{t('about.skillsLabel', 'Skills')}</div>
          <div className="about-skill-copy">
            <p className="block-copy">
              {t(
                'about.background',
                'Engineering at Toyota Systems, MBA from Laurentian University, fluent in Chinese, Japanese, and English.',
              )}
            </p>
          </div>
          <div className="about-language-band">
            <span className="about-language-label">
              {t('about.skillsListLabel', 'Core areas')}
            </span>
            <div className="about-language-list">
              {skillItems.map((skill) => (
                <span key={skill} className="about-language-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </article>

        <article className="content-block about-focus-panel">
          <div className="block-label">{t('about.focusLabel', 'Current Focus')}</div>
          <div className="about-focus-lines">
            {focusLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </article>

        <article className="content-block about-connect-panel">
          <div className="block-label">{t('about.connectLabel', 'Connect')}</div>
          <div className="about-connect-grid">
            {profiles.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="about-connect-link"
              >
                <span className="about-connect-icon">
                  <link.icon size={15} />
                </span>
                <span className="about-connect-copy">
                  <small>{link.meta}</small>
                  <strong>{link.label}</strong>
                </span>
                <FiArrowUpRight size={14} />
              </a>
            ))}
            <a href={resumeFilePath} download className="about-connect-link">
              <span className="about-connect-icon">
                <FiDownload size={15} />
              </span>
              <span className="about-connect-copy">
                <small>CV</small>
                <strong>{t('about.downloadResume', 'Download Resume')}</strong>
              </span>
              <FiArrowUpRight size={14} />
            </a>
          </div>
        </article>
      </section>

      <section className="page-section">
        <ResumeArchive />
      </section>
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
