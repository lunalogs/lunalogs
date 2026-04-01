import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';

// Constellation nodes for the knowledge map teaser
interface ConstellationNode {
  id: string;
  label: string;
  x: number;
  y: number;
  connections: string[];
}

const Writing: React.FC = () => {
  const { t } = useTranslation('common');

  // Knowledge constellation visualization data
  const constellationNodes: ConstellationNode[] = [
    { id: 'ai', label: 'AI Systems', x: 20, y: 30, connections: ['engineering', 'product'] },
    { id: 'crypto', label: 'Onchain', x: 75, y: 25, connections: ['economics', 'engineering'] },
    { id: 'engineering', label: 'Engineering', x: 45, y: 50, connections: ['product'] },
    { id: 'product', label: 'Product', x: 60, y: 60, connections: [] },
    { id: 'economics', label: 'Markets', x: 80, y: 55, connections: ['crypto'] },
    { id: 'research', label: 'Research', x: 30, y: 70, connections: ['ai', 'engineering'] },
  ];

  // Writing items - placeholders as active directions
  const writingItems = [
    {
      id: 'building-in-public',
      title: 'Building in Public',
      date: 'Coming soon',
      tags: ['meta', 'process'],
      excerpt: 'Thoughts on sharing work while it is still in progress.',
    },
    {
      id: 'ai-crypto-intersection',
      title: 'AI × Crypto: Notes from the Intersection',
      date: 'Coming soon',
      tags: ['AI', 'crypto', 'research'],
      excerpt: 'Exploring where intelligent agents meet decentralized systems.',
    },
    {
      id: 'engineering-with-context',
      title: 'Engineering with Business Context',
      date: 'Coming soon',
      tags: ['engineering', 'product'],
      excerpt: 'Why technical decisions are better when you understand the market.',
    },
  ];

  return (
    <div className="writing-container">
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">{t('writing.pageTitle', 'Writing')}</h1>
        <p className="page-subtitle">
          {t('writing.pageSubtitle', 'Essays, notes, and research. A knowledge space in progress.')}
        </p>
      </header>

      {/* Knowledge Map / Constellation Teaser */}
      <div className="knowledge-map-teaser">
        {/* Constellation visualization */}
        <svg 
          className="constellation-canvas" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          {/* Connection lines */}
          {constellationNodes.map((node) =>
            node.connections.map((targetId) => {
              const target = constellationNodes.find(n => n.id === targetId);
              if (!target) return null;
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="var(--border)"
                  strokeWidth="0.2"
                  strokeDasharray="2 1"
                />
              );
            })
          )}
          
          {/* Nodes */}
          {constellationNodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="2"
                fill="var(--bg-primary)"
                stroke="var(--accent)"
                strokeWidth="0.3"
              />
            </g>
          ))}
        </svg>

        {/* Node labels */}
        {constellationNodes.map((node) => (
          <div
            key={node.id}
            className="constellation-node"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {node.label}
          </div>
        ))}

        <span className="knowledge-map-label">
          {t('writing.mapLabel', 'Knowledge Constellation Preview')}
        </span>
      </div>

      {/* Writing List */}
      <div className="writing-list">
        {writingItems.map((item) => (
          <article key={item.id} className="writing-item">
            <h2 className="writing-item-title">{item.title}</h2>
            <div className="writing-item-meta">
              <span>{item.date}</span>
              <div className="writing-item-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="writing-tag">{tag}</span>
                ))}
              </div>
            </div>
            <p style={{ 
              fontSize: '0.9375rem', 
              color: 'var(--text-secondary)', 
              marginTop: '0.75rem',
              lineHeight: 1.6 
            }}>
              {item.excerpt}
            </p>
          </article>
        ))}
      </div>

      {/* Newsletter / Subscribe Teaser */}
      <div style={{ 
        marginTop: '4rem', 
        padding: '2rem', 
        borderTop: '1px solid var(--border-light)',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
          {t('writing.followTeaser', 'New writing shared on ')}
          <a 
            href="https://x.com/luna25y_" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)' }}
          >
            Twitter/X
          </a>
          {' '}{t('writing.and', 'and')}{' '}
          <a 
            href="https://github.com/luna25y" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)' }}
          >
            GitHub
          </a>
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

export default Writing;
