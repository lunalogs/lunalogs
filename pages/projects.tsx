import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { projectEntries, type ProjectEntry } from '../lib/content';

const Projects: React.FC = () => {
  const { t } = useTranslation('common');

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
          View project <FiArrowUpRight size={14} />
        </a>
      );
    }

    return (
      <Link href={href} className="inline-link">
        View project <FiArrowUpRight size={14} />
      </Link>
    );
  };

  const screenshotUrl = (href: string) =>
    `https://image.thum.io/get/width/1200/noanimate/${href}`;

  const renderLinkedPreview = (
    project: ProjectEntry,
    preview: React.ReactNode,
  ) => {
    if (!project.href) {
      return preview;
    }

    if (project.href.startsWith('http')) {
      return (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="project-thumb-link"
          aria-label={`Open ${project.name}`}
        >
          {preview}
        </a>
      );
    }

    return (
      <Link
        href={project.href}
        className="project-thumb-link"
        aria-label={`Open ${project.name}`}
      >
        {preview}
      </Link>
    );
  };

  const ProjectPreview = ({ project }: { project: ProjectEntry }) => {
    const [imageFailed, setImageFailed] = useState(false);

    if (project.previewImage) {
      return renderLinkedPreview(
        project,
        <div className={`project-thumb project-thumb-${project.id}`}>
          <div className="project-thumb-window">
            <span />
            <span />
            <span />
          </div>
          <div className="project-thumb-body project-thumb-body-centered">
            <img src={project.previewImage} alt={`${project.name} preview`} />
            <strong>{project.name}</strong>
            <small>{project.previewDomain}</small>
          </div>
        </div>,
      );
    }

    const canUseLiveScreenshot =
      !!project.href && project.href.startsWith('http') && !imageFailed;

    if (canUseLiveScreenshot) {
      return renderLinkedPreview(
        project,
        <div className={`project-thumb project-thumb-${project.id}`}>
          <div className="project-thumb-window">
            <span />
            <span />
            <span />
          </div>
          <div className="project-thumb-image-wrap">
            <img
              src={screenshotUrl(project.href!)}
              alt={`${project.name} live preview`}
              className="project-thumb-live-image"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
            />
            <div className="project-thumb-overlay">
              {project.previewDomain && (
                <small className="project-thumb-domain">{project.previewDomain}</small>
              )}
              <strong>{project.name}</strong>
            </div>
          </div>
        </div>,
      );
    }

    return renderLinkedPreview(
      project,
      <div className={`project-thumb project-thumb-${project.id}`}>
        <div className="project-thumb-window">
          <span />
          <span />
          <span />
        </div>
        <div className="project-thumb-body">
          <small className="project-thumb-domain">{project.previewDomain}</small>
          <strong>{project.name}</strong>
          <div className="project-thumb-lines">
            <span className="long" />
            <span className="short" />
            <span className="mid" />
          </div>
        </div>
      </div>,
    );
  };

  return (
    <div className="page-shell">
      <header className="page-header-block">
        <p className="page-kicker">Projects</p>
        <h1 className="page-title-display">{t('projects.pageTitle', 'Projects')}</h1>
        <p className="page-intro">
          {t(
            'projects.pageSubtitle',
            'Selected work and active explorations. Some are live, others in progress.',
          )}
        </p>
      </header>

      <section className="page-section">
        <div className="editorial-list spacious-list">
          {projectEntries.map((project) => (
            <article key={project.id} className="project-row">
              <div className="project-row-meta">
                <span>{project.eyebrow}</span>
                <span>{project.year}</span>
                <span>{project.status}</span>
              </div>

              <div className="project-row-main">
                <div className="project-row-heading">
                  <h2>{project.name}</h2>
                </div>
                <p className="project-row-summary">{project.summary}</p>
                <p className="project-row-detail">{project.detail}</p>
              </div>

              <div className="project-row-preview">
                <ProjectPreview project={project} />
              </div>

              <div className="project-row-action">
                {renderProjectLink(project.href) ?? (
                  <span className="inline-link muted-link">{project.status}</span>
                )}
              </div>
            </article>
          ))}
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

export default Projects;
