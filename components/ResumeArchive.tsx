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
    <ul className="archive-description">
      {items.map((item, index) => (
        <li key={`${index}-${item.slice(0, 24)}`}>{item.replace(/^-+\s*/, '')}</li>
      ))}
    </ul>
  );
};

const renderSkills = (skills?: string[]) => {
  if (!skills?.length) return null;

  return (
    <div className="archive-skill-list">
      {skills.map((skill, index) => (
        <span key={`${index}-${skill}`} className="archive-skill-pill">
          {skill}
        </span>
      ))}
    </div>
  );
};

const renderSubEntries = (entries?: ResumeArchiveEntry[]) => {
  if (!entries?.length) return null;

  return (
    <div className="archive-subentries">
      {entries.map((entry, index) => (
        <article key={entryKey(entry, index)} className="archive-subentry">
          <div className="archive-subentry-meta">
            <span>{entry.period}</span>
            {entry.type && <span>{entry.type}</span>}
          </div>

          <div className="archive-subentry-main">
            <h4>{entry.subTitle ?? entry.position ?? entry.institution}</h4>
            {entry.institution && (
              <p className="archive-subentry-org">{entry.institution}</p>
            )}
            {formatMeta(entry) && (
              <p className="archive-subentry-detail">{formatMeta(entry)}</p>
            )}
            {renderDescriptions(entry.description)}
            {renderSkills(entry.skills)}
          </div>
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
    <section className="archive-section">
      <div className="archive-header">
        <p className="page-kicker">{t('about.timeline.heading', 'Experience Timeline')}</p>
        <p className="archive-summary">
          {t(
            'about.timeline.summary',
            'Latest resume content, shown from most recent to oldest.',
          )}
        </p>
      </div>

      <div className="archive-list">
        {entries.map((entry, index) => (
          <article key={entryKey(entry, index)} className="archive-item">
            <div className="archive-item-meta">
              <span>{entry.period}</span>
              {entry.type && <span>{entry.type}</span>}
            </div>

            <div className="archive-item-main">
              <h3>{entry.position ?? entry.institution}</h3>
              {entry.institution && entry.position && (
                <p className="archive-organization">{entry.institution}</p>
              )}
              {formatMeta(entry) && (
                <p className="archive-detail">{formatMeta(entry)}</p>
              )}
              {renderDescriptions(entry.description)}
              {renderSkills(entry.skills)}
              {renderSubEntries(entry.subEntries)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ResumeArchive;
