import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  year: string;
  category: string;
  description: string;
  previewImage?: string;
  href?: string;
  hrefLabel?: string;
  status: 'live' | 'wip' | 'concept';
  previewTone: string;
}

const Projects: React.FC = () => {
  const { t } = useTranslation('common');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Projects data - realistic placeholders framed as active directions
  const projects: Project[] = [
    {
      id: 'taptune',
      name: 'TapTune',
      year: '2023',
      category: 'macOS App',
      description: 'Mechanical keyboard sound simulator for macOS. Custom sound profiles, real-time visualization, multi-language support.',
      previewImage: '/images/taptune-icon.png',
      href: '/projects/taptune',
      hrefLabel: 'View project',
      status: 'live',
      previewTone: 'var(--preview-taptune)',
    },
    {
      id: 'onchain-experiments',
      name: 'Onchain Experiments',
      year: '2024',
      category: 'Web3',
      description: 'Exploring decentralized applications and smart contract interactions. Research phase.',
      status: 'wip',
      previewTone: 'var(--preview-onchain)',
    },
    {
      id: 'ai-workflows',
      name: 'AI Workflow Tools',
      year: '2024–2025',
      category: 'AI × Productivity',
      description: 'Building internal tools and agents for research and content workflows.',
      status: 'wip',
      previewTone: 'var(--preview-ai)',
    },
    {
      id: 'knowledge-graph',
      name: 'Knowledge Constellation',
      year: '2025',
      category: 'Knowledge Management',
      description: 'A visual approach to connecting ideas and research. Early exploration.',
      status: 'concept',
      previewTone: 'var(--preview-writing)',
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const activeProject = projects.find(p => p.id === hoveredProject);

  return (
    <div className="projects-container" ref={containerRef}>
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">{t('projects.pageTitle', 'Projects')}</h1>
        <p className="page-subtitle">
          {t('projects.pageSubtitle', 'Selected work and active explorations. Some are live, others in progress.')}
        </p>
      </header>

      {/* Project List */}
      <div className="project-list">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`project-item ${project.href ? 'is-clickable' : 'is-disabled'}`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {project.href ? (
              <Link href={project.href} className="project-link-shell">
                <div className="project-item-content">
                  <h2 className="project-name">{project.name}</h2>
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span style={{ margin: '0 0.5rem', opacity: 0.3 }}>·</span>
                    <span>{project.year}</span>
                    <span style={{ margin: '0 0.5rem', opacity: 0.3 }}>·</span>
                    <span className="project-status">{project.status}</span>
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                <span className="project-link-label">{project.hrefLabel ?? 'Open'}</span>
              </Link>
            ) : (
              <div className="project-link-shell" aria-disabled="true">
                <div className="project-item-content">
                  <h2 className="project-name">{project.name}</h2>
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span style={{ margin: '0 0.5rem', opacity: 0.3 }}>·</span>
                    <span>{project.year}</span>
                    <span style={{ margin: '0 0.5rem', opacity: 0.3 }}>·</span>
                    <span className="project-status">{project.status}</span>
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                <span className="project-link-label muted">In progress</span>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Floating Preview */}
      {activeProject && (
        <div
          className={`project-preview ${hoveredProject ? 'visible' : ''}`}
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 140,
          }}
        >
          {activeProject.previewImage ? (
            <img 
              src={activeProject.previewImage} 
              alt={activeProject.name}
            />
          ) : (
            <div
              className="project-preview-fallback"
              style={{ background: activeProject.previewTone }}
            >
              <span className="project-preview-eyebrow">{activeProject.category}</span>
              <strong>{activeProject.name}</strong>
              <p>{activeProject.description}</p>
            </div>
          )}
        </div>
      )}

      {/* Empty State / More Coming */}
      <div style={{ 
        marginTop: '4rem', 
        padding: '2rem', 
        borderTop: '1px solid var(--border-light)',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
          {t('projects.moreComing', 'More projects documented as they mature.')}
        </p>
      </div>
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
