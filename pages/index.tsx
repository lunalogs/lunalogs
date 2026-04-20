import React from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FiArrowUpRight, FiDownload, FiMapPin } from 'react-icons/fi';
import { projectEntries, writingEntries } from '../lib/content';
import { resumeFilePath, socialLinks } from '../lib/site';

const Home: React.FC = () => {
  const { t } = useTranslation('common');
  const heroLines = [
    t('home.heroLineOne', "I'm luna,"),
    t('home.heroLineTwo', 'a software engineer'),
    t('home.heroLineThree', 'turned business builder.'),
  ];

  const renderProjectLink = (href?: string) => {
    if (!href) {
      return null;
    }

    if (href.startsWith('http')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-link"
        >
          Open project <FiArrowUpRight size={14} />
        </a>
      );
    }

    return (
      <Link href={href} className="inline-link">
        Open case study <FiArrowUpRight size={14} />
      </Link>
    );
  };

  return (
    <div className="page-shell home-page">
      <header className="page-header-block">
        <p className="page-kicker">Introduction</p>
        <h1 className="page-title-display home-hero-title">
          {heroLines.map((line) => (
            <span key={line} className="page-title-line">
              {line}
            </span>
          ))}
        </h1>
        <p className="page-intro">
          {t(
            'home.posterNote',
            "I've spent the past few years at the crossroads of technology and markets: building enterprise systems in Japan, researching crypto trends at a digital asset exchange, and earning an MBA along the way.",
          )}
        </p>
      </header>

      <section className="home-grid">
        <div className="home-column home-column-primary">
          <article className="content-block">
            <div className="block-label">Selected projects</div>
            <div className="editorial-list">
              {projectEntries.slice(0, 3).map((project) => (
                <div key={project.id} className="editorial-row">
                  <div className="editorial-meta">
                    <span>{project.eyebrow}</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="editorial-content">
                    <h2>{project.name}</h2>
                    <p>{project.summary}</p>
                    {renderProjectLink(project.href) ?? (
                      <span className="inline-link muted-link">{project.status}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="home-column home-column-secondary">
          <article className="content-block compact-block">
            <div className="block-label">Base</div>
            <div className="detail-stack">
              <div className="detail-line">
                <FiMapPin size={14} />
                <span>{t('about.location', 'Toronto, Canada')}</span>
              </div>
              <p className="block-copy">
                {t(
                  'home.baseBody',
                  "I'm fluent in Chinese, Japanese, and English, and slowly conquering French.",
                )}
              </p>
            </div>
          </article>

          <article className="content-block compact-block">
            <div className="block-label">Writing queue</div>
            <div className="title-column">
              {writingEntries.map((entry) => (
                <Link key={entry.id} href="/writing" className="title-column-link">
                  <small>{entry.eyebrow}</small>
                  <span>{entry.title}</span>
                </Link>
              ))}
            </div>
          </article>

          <article className="content-block compact-block">
            <div className="block-label">Links</div>
            <div className="link-stack">
              <a href={resumeFilePath} download className="action-link">
                <FiDownload size={14} />
                <span>{t('about.downloadResume', 'Download Resume')}</span>
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                <span>GitHub</span>
                <FiArrowUpRight size={14} />
              </a>
              <a
                href={socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link"
              >
                <span>X / Twitter</span>
                <FiArrowUpRight size={14} />
              </a>
            </div>
          </article>
        </div>
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

export default Home;
