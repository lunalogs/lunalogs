import React, { useState, useRef } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FiDownload, FiPlus, FiMapPin, FiMail, FiArrowUpRight } from 'react-icons/fi';
import { FaGithub, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import FoxConstellation from '../components/FoxConstellation';
import { resumeFilePath, socialLinks } from '../lib/site';

type ExpandedSection = 'projects' | 'writing' | 'about' | null;

const Home: React.FC = () => {
  const { t } = useTranslation('common');
  const [expanded, setExpanded] = useState<ExpandedSection>(null);
  const [exiting, setExiting] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = (section: ExpandedSection) => {
    if (expanded === section) {
      setExiting(true);
      exitTimer.current = setTimeout(() => {
        setExpanded(null);
        setExiting(false);
      }, 340);
    } else {
      if (exitTimer.current) clearTimeout(exitTimer.current);
      setExiting(false);
      setExpanded(section);
    }
  };

  const secondaryLinks = [
    { href: socialLinks.github, icon: FaGithub, label: 'GitHub' },
    { href: socialLinks.x, icon: FaXTwitter, label: 'X' },
    { href: socialLinks.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
  ];

  const aboutSocialLinks = [
    { href: socialLinks.github, icon: FaGithub, label: 'GitHub' },
    { href: socialLinks.x, icon: FaXTwitter, label: 'Twitter' },
    { href: socialLinks.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
    { href: socialLinks.email, icon: FiMail, label: 'Email' },
  ];

  const projects = [
    {
      id: 'taptune',
      name: 'TapTune',
      category: 'macOS App',
      year: '2023',
      description: 'Mechanical keyboard sound simulator for macOS. Custom sound profiles, real-time visualization, multi-language support.',
      href: '/projects/taptune',
      status: 'live' as const,
    },
    {
      id: 'onchain-experiments',
      name: 'Onchain Experiments',
      category: 'Web3',
      year: '2024',
      description: 'Exploring decentralized applications and smart contract interactions. Research phase.',
      status: 'wip' as const,
    },
    {
      id: 'ai-workflows',
      name: 'AI Workflow Tools',
      category: 'AI × Productivity',
      year: '2024–2025',
      description: 'Building internal tools and agents for research and content workflows.',
      status: 'wip' as const,
    },
    {
      id: 'knowledge-graph',
      name: 'Knowledge Constellation',
      category: 'Knowledge Management',
      year: '2025',
      description: 'A visual approach to connecting ideas and research. Early exploration.',
      status: 'concept' as const,
    },
  ];

  const writings = [
    {
      id: 'building-in-public',
      title: 'Building in Public',
      tags: ['meta', 'process'],
      excerpt: 'Thoughts on sharing work while it is still in progress.',
    },
    {
      id: 'ai-crypto-intersection',
      title: 'AI × Crypto: Notes from the Intersection',
      tags: ['AI', 'crypto', 'research'],
      excerpt: 'Exploring where intelligent agents meet decentralized systems.',
    },
    {
      id: 'engineering-with-context',
      title: 'Engineering with Business Context',
      tags: ['engineering', 'product'],
      excerpt: 'Why technical decisions are better when you understand the market.',
    },
  ];

  const navItems: { id: ExpandedSection; label: string }[] = [
    { id: 'projects', label: t('home.projectsLabel', 'Projects') },
    { id: 'writing', label: t('home.writingLabel', 'Writing') },
    { id: 'about', label: t('home.aboutLabel', 'About') },
  ];

  return (
    <div className="home-editorial">
      <FoxConstellation />

      {/* Project background preview */}
      {hoveredProject && (
        <div className={`project-bg-preview project-bg-preview--${hoveredProject}`}>
          <div className="project-bg-image" />
          <div className="project-bg-glow" />
        </div>
      )}
      <section className={`home-poster ${expanded ? 'section-expanded' : ''}`}>
        <div className="home-poster-main">
          {/* Top group: luna + nav items before active (or all items if nothing expanded) */}
          <div className="home-poster-stack animate-fade-in stagger-1">
            <h1 className="home-poster-line home-poster-line-primary">
              {t('home.nameplate', 'luna')}
              <span className="home-poster-tagline-inline">building in tech, crypto & AI</span>
            </h1>
            {(expanded
              ? navItems.slice(0, navItems.findIndex((n) => n.id === expanded))
              : navItems
            ).map((item) => (
              <div key={item.id} className="home-poster-line home-poster-line-nav">
                <button
                  className="section-toggle"
                  onClick={() => toggle(item.id)}
                  aria-expanded={false}
                >
                  <span>{item.label}</span>
                  <span className="section-toggle-icon"><FiPlus size={20} /></span>
                </button>
              </div>
            ))}
          </div>

          {/* Active item row: title on left, content on right */}
          {expanded && (
            <div className={`home-poster-active-row${exiting ? ' is-exiting' : ''}`}>
              <div className="home-poster-line home-poster-line-nav is-active">
                <button
                  className="section-toggle"
                  onClick={() => toggle(expanded)}
                  aria-expanded={true}
                >
                  <span>{navItems.find((n) => n.id === expanded)?.label}</span>
                  <span className="section-toggle-icon section-toggle-icon--open"><FiPlus size={20} /></span>
                </button>
              </div>

              {expanded === 'projects' && (
                <div className="expanded-content">
                  <div className="expanded-inner">
                    <p className="expanded-subtitle">
                      {t('projects.pageSubtitle', 'Selected work and active explorations. Some are live, others in progress.')}
                    </p>
                    <div className="inline-project-list">
                      {projects.map((p) => (
                        <div
                          key={p.id}
                          className="inline-project-item"
                          onMouseEnter={() => setHoveredProject(p.id)}
                          onMouseLeave={() => setHoveredProject(null)}
                        >
                          <div className="inline-project-header">
                            <h3 className="inline-project-name">
                              {p.href ? (
                                <Link href={p.href}>
                                  {p.name} <FiArrowUpRight size={14} />
                                </Link>
                              ) : p.name}
                            </h3>
                            <span className={`inline-project-status status-${p.status}`}>{p.status}</span>
                          </div>
                          <p className="inline-project-meta">{p.category} · {p.year}</p>
                          <p className="inline-project-desc">{p.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {expanded === 'writing' && (
                <div className="expanded-content">
                  <div className="expanded-inner">
                    <p className="expanded-subtitle">
                      {t('writing.pageSubtitle', 'Essays, notes, and research. A knowledge space in progress.')}
                    </p>
                    <div className="inline-writing-list">
                      {writings.map((w) => (
                        <div key={w.id} className="inline-writing-item">
                          <h3 className="inline-writing-title">{w.title}</h3>
                          <div className="inline-writing-tags">
                            {w.tags.map((tag) => (
                              <span key={tag} className="inline-writing-tag">{tag}</span>
                            ))}
                          </div>
                          <p className="inline-writing-excerpt">{w.excerpt}</p>
                        </div>
                      ))}
                    </div>
                    <p className="inline-writing-note">
                      {t('writing.followTeaser', 'New writing shared on ')}
                      <a href={socialLinks.x} target="_blank" rel="noopener noreferrer">Twitter/X</a>
                    </p>
                  </div>
                </div>
              )}

              {expanded === 'about' && (
                <div className="expanded-content">
                  <div className="expanded-inner">
                    <p className="about-intro">
                      {t('about.intro', 'I am a software engineer with an MBA, working at the intersection of technology and business. I have built internal tools at Toyota Systems, coordinated iOS projects, and spent years navigating both code and markets. Currently exploring AI agents and onchain applications.')}
                    </p>
                    <div className="about-details-compact">
                      <div className="about-detail-item">
                        <h3>{t('about.locationLabel', 'Location')}</h3>
                        <p>
                          <FiMapPin size={14} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                          {t('about.location', 'Toronto, Canada')}
                        </p>
                      </div>
                      <div className="about-detail-item">
                        <h3>{t('about.focusLabel', 'Current Focus')}</h3>
                        <p>{t('about.focus', 'AI × Crypto. Building useful products. Learning in public.')}</p>
                      </div>
                      <div className="about-detail-item">
                        <h3>{t('about.backgroundLabel', 'Background')}</h3>
                        <p>{t('about.background', 'Engineering at Toyota Systems, MBA from Laurentian University, fluent in Chinese, Japanese, and English.')}</p>
                      </div>
                      <div className="about-detail-item">
                        <h3>{t('about.connectLabel', 'Connect')}</h3>
                        <div className="about-social-icons">
                          {aboutSocialLinks.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              target={link.href.startsWith('mailto') ? undefined : '_blank'}
                              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                              aria-label={link.label}
                            >
                              <link.icon size={16} />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <a href={resumeFilePath} download className="resume-download-compact">
                      <FiDownload size={14} />
                      {t('about.downloadResume', 'Download Resume')}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Post group: nav items after active */}
          {expanded && navItems.findIndex((n) => n.id === expanded) < navItems.length - 1 && (
            <div className={`home-poster-stack-post${exiting ? ' is-exiting' : ''}`}>
              {navItems.slice(navItems.findIndex((n) => n.id === expanded) + 1).map((item) => (
                <div key={item.id} className="home-poster-line home-poster-line-nav">
                  <button
                    className="section-toggle"
                    onClick={() => toggle(item.id)}
                    aria-expanded={false}
                  >
                    <span>{item.label}</span>
                    <span className="section-toggle-icon"><FiPlus size={20} /></span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`home-poster-footer animate-fade-in stagger-2 ${expanded ? 'dimmed' : ''}`}>
          <p className="home-poster-note">
            {t(
              'home.posterNote',
              'Software engineer with business context. Building lunalogs as a quiet index for work, writing, and future experiments.',
            )}
          </p>
          <div className="home-poster-actions">
            <a href={resumeFilePath} download className="home-poster-action">
              {t('home.resumeCta', 'Resume')}
              <FiDownload aria-hidden="true" size={14} />
            </a>
            <div className="home-poster-links">
              {secondaryLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>
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
