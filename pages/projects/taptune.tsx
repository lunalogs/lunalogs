import React from 'react';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const TapTuneProject: React.FC = () => {
  return (
    <div className="project-detail-page">
      <Link href="/projects" className="project-back-link">
        Back to projects
      </Link>

      <header className="project-detail-hero">
        <div className="project-detail-meta">TapTune · 2023 · macOS App</div>
        <h1 className="project-detail-title">TapTune</h1>
        <p className="project-detail-summary">
          A keyboard sound simulator for macOS focused on playful feedback,
          customizable sound profiles, and responsive visual interaction.
        </p>
      </header>

      <section className="project-detail-grid">
        <div className="project-detail-visual">
          <img src="/images/taptune-icon.png" alt="TapTune icon" />
        </div>

        <div className="project-detail-copy">
          <div className="project-detail-block">
            <h2>Overview</h2>
            <p>
              TapTune started as a focused desktop app experiment around sound,
              tactile interface feedback, and a lightweight utility experience.
              This first public site version keeps the project page concise while
              the full case study is still being documented.
            </p>
          </div>

          <div className="project-detail-block">
            <h2>What it explored</h2>
            <ul>
              <li>Custom keyboard sound profiles for macOS</li>
              <li>Real-time visual feedback tied to keystrokes</li>
              <li>A compact utility-app workflow with multi-language support</li>
            </ul>
          </div>

          <div className="project-detail-block">
            <h2>Status</h2>
            <p>
              This page is a placeholder landing page for the project while a
              fuller write-up and richer screenshots are prepared.
            </p>
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

export default TapTuneProject;
