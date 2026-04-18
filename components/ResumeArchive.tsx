import React from 'react';
import { useTranslation } from 'next-i18next';

interface ResumeArchiveEntry {
  period: string;
  duration?: string;
  type?: string;
  position?: string;
  institution?: string;
  location?: string;
  description?: string[];
  skills?: string[];
  subTitle?: string;
  subEntries?: ResumeArchiveEntry[];
}

const entryKey = (entry: ResumeArchiveEntry, index: number) =>
  [
    entry.period,
    entry.subTitle,
    entry.position,
    entry.institution,
    String(index),
  ]
    .filter(Boolean)
    .join('-');

const formatMeta = (entry: ResumeArchiveEntry) =>
  [entry.duration, entry.location].filter(Boolean).join(' · ');

const renderDescriptions = (items?: string[]) => {
  if (!items?.length) return null;

  return (
    <ul className="about-archive-description">
      {items.map((item, index) => (
        <li key={`${index}-${item.slice(0, 24)}`}>{item.replace(/^-+\s*/, '')}</li>
      ))}
    </ul>
  );
};

const renderSkills = (skills?: string[]) => {
  if (!skills?.length) return null;

  return (
    <div className="about-skill-tags">
      {skills.map((skill, index) => (
        <span key={`${index}-${skill}`} className="about-skill-tag">
          {skill}
        </span>
      ))}
    </div>
  );
};

const renderSubEntries = (entries?: ResumeArchiveEntry[]) => {
  if (!entries?.length) return null;

  return (
    <div className="about-archive-subentries">
      {entries.map((entry, index) => (
        <article
          key={entryKey(entry, index)}
          className="about-archive-subentry"
        >
          <div className="about-archive-submarker" aria-hidden="true" />
          <div className="about-archive-subheading">
            <div>
              <p className="about-archive-period about-archive-period-sub">
                {entry.period}
              </p>
              <h3>{entry.subTitle ?? entry.position ?? entry.institution}</h3>
            </div>
            {entry.type && (
              <span className="about-timeline-type about-timeline-type-sub">
                {entry.type}
              </span>
            )}
          </div>
          {entry.institution && (
            <p className="about-archive-institution">{entry.institution}</p>
          )}
          {formatMeta(entry) && (
            <p className="about-archive-meta">{formatMeta(entry)}</p>
          )}
          {renderDescriptions(entry.description)}
          {renderSkills(entry.skills)}
        </article>
      ))}
    </div>
  );
};

const ResumeArchive: React.FC = () => {
  const { t } = useTranslation('common');
  const entries = t('about.timeline.entries', {
    returnObjects: true,
  }) as ResumeArchiveEntry[];

  return (
    <section className="about-archive">
      <div className="about-archive-header">
        <h2>{t('about.timeline.heading', 'Experience Timeline')}</h2>
        <p className="about-archive-intro">
          {t(
            'about.timeline.summary',
            'Latest resume content, shown from most recent to oldest.',
          )}
        </p>
      </div>

      <ol className="about-archive-list">
        {entries.map((entry, index) => (
          <li
            key={entryKey(entry, index)}
            className="about-archive-item"
          >
            <article className="about-archive-card">
              <div className="about-archive-marker" aria-hidden="true" />
              <div className="about-archive-card-inner">
                <div className="about-archive-topline">
                  <p className="about-archive-period">{entry.period}</p>
                  {entry.type && (
                    <span className="about-timeline-type">{entry.type}</span>
                  )}
                </div>
                <h3 className="about-archive-heading">
                  {entry.position ?? entry.institution}
                </h3>
                {entry.institution && entry.position && (
                  <p className="about-archive-institution">{entry.institution}</p>
                )}
                {formatMeta(entry) && (
                  <p className="about-archive-meta">{formatMeta(entry)}</p>
                )}

                <div className="about-archive-body">
                  {renderDescriptions(entry.description)}
                  {renderSkills(entry.skills)}
                  {renderSubEntries(entry.subEntries)}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ResumeArchive;
