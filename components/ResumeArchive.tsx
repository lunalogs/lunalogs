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

const formatMeta = (entry: ResumeArchiveEntry) =>
  [entry.type, entry.duration, entry.location].filter(Boolean).join(' · ');

const renderDescriptions = (items?: string[]) => {
  if (!items?.length) return null;

  return (
    <ul className="about-archive-description">
      {items.map((item) => (
        <li key={item}>{item.replace(/^-+\s*/, '')}</li>
      ))}
    </ul>
  );
};

const renderSkills = (skills?: string[]) => {
  if (!skills?.length) return null;

  return (
    <div className="about-skill-tags">
      {skills.map((skill) => (
        <span key={skill} className="about-skill-tag">
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
      {entries.map((entry) => (
        <div
          key={[
            entry.period,
            entry.subTitle,
            entry.position,
            entry.institution,
          ].filter(Boolean).join('-')}
          className="about-archive-subentry"
        >
          <div className="about-archive-subheading">
            <h3>{entry.subTitle ?? entry.position ?? entry.institution}</h3>
            <span>{entry.period}</span>
          </div>
          {entry.institution && (
            <p className="about-archive-institution">{entry.institution}</p>
          )}
          {formatMeta(entry) && (
            <p className="about-archive-meta">{formatMeta(entry)}</p>
          )}
          {renderDescriptions(entry.description)}
          {renderSkills(entry.skills)}
        </div>
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
        <h2>{t('about.timeline.heading', 'Experience Archive')}</h2>
        <p className="about-archive-intro">
          {t(
            'about.timeline.summary',
            'A preserved multi-language record of previous study and work experience.',
          )}
        </p>
      </div>

      <div className="about-archive-list">
        {entries.map((entry) => (
          <details
            key={[
              entry.period,
              entry.position,
              entry.institution,
            ].filter(Boolean).join('-')}
            className="about-archive-item"
          >
            <summary className="about-archive-summary">
              <div>
                <p className="about-archive-period">{entry.period}</p>
                <h3 className="about-archive-heading">
                  {entry.position ?? entry.institution}
                </h3>
                {entry.institution && entry.position && (
                  <p className="about-archive-institution">{entry.institution}</p>
                )}
              </div>
              {formatMeta(entry) && (
                <span className="about-archive-meta">{formatMeta(entry)}</span>
              )}
            </summary>

            <div className="about-archive-body">
              {renderDescriptions(entry.description)}
              {renderSkills(entry.skills)}
              {renderSubEntries(entry.subEntries)}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default ResumeArchive;
