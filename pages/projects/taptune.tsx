import React from 'react';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const TapTuneProject: React.FC = () => {
  return (
    <div className="page-shell project-detail-page">
      <div className="detail-backline">
        <Link href="/projects" className="inline-link">
          Back to projects
        </Link>
      </div>

      <header className="page-header-block project-detail-hero">
        <p className="page-kicker">macOS utility · 2023</p>
        <h1 className="page-title-display">TapTune</h1>
        <p className="page-intro">
          A keyboard sound simulator for macOS focused on playful feedback,
          customizable sound profiles, and responsive visual interaction.
        </p>
      </header>

      <section className="project-detail-grid">
        <div className="project-detail-visual">
          <img src="/images/taptune-icon.png" alt="TapTune icon" />
        </div>

        <div className="project-detail-sections">
          <article className="content-block">
            <div className="block-label">Overview</div>
            <p className="block-copy">
              TapTune started as a compact desktop experiment around tactile
              feedback, personality, and utility app restraint. The project page
              here is intentionally editorial: one clear summary, the core
              ideas, and room for a fuller case study later.
            </p>
          </article>

          <article className="content-block">
            <div className="block-label">What it explored</div>
            <ul className="detail-list">
              <li>Custom keyboard sound profiles for macOS</li>
              <li>Real-time visual feedback tied to keystrokes</li>
              <li>A small footprint utility flow with multilingual support</li>
            </ul>
          </article>

          <article className="content-block">
            <div className="block-label">Status</div>
            <p className="block-copy">
              This is currently a concise landing page while a richer write-up
              and more polished screenshots are being prepared.
            </p>
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

export default TapTuneProject;
