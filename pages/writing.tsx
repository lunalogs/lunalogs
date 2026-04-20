import React, { startTransition, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import Script from 'next/script';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { writingEntries } from '../lib/content';

const extractXPostId = (url?: string) => {
  if (!url) {
    return null;
  }

  const match = url.match(/status\/(\d+)/);
  return match?.[1] ?? null;
};

type MarkdownBlock =
  | { type: 'heading'; level: 2 | 3; content: string }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'paragraph'; content: string };

const parseMarkdown = (markdown?: string): MarkdownBlock[] => {
  if (!markdown?.trim()) {
    return [];
  }

  return markdown
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      const firstLine = lines[0] ?? '';

      if (firstLine.startsWith('## ')) {
        return {
          type: 'heading' as const,
          level: 2 as const,
          content: firstLine.replace(/^##\s+/, ''),
        };
      }

      if (firstLine.startsWith('### ')) {
        return {
          type: 'heading' as const,
          level: 3 as const,
          content: firstLine.replace(/^###\s+/, ''),
        };
      }

      if (lines.every((line) => line.startsWith('>'))) {
        return {
          type: 'blockquote' as const,
          lines: lines.map((line) => line.replace(/^>\s?/, '')),
        };
      }

      return {
        type: 'paragraph' as const,
        content: lines.join(' '),
      };
    });
};

const Writing: React.FC = () => {
  const { t } = useTranslation('common');
  const [openId, setOpenId] = useState<string | null>(null);
  const [xScriptReady, setXScriptReady] = useState(false);

  const activeEntry = useMemo(
    () => writingEntries.find((entry) => entry.id === openId) ?? null,
    [openId],
  );

  useEffect(() => {
    if (!openId || !xScriptReady || !activeEntry?.xPostUrl) {
      return;
    }

    const xPostId = extractXPostId(activeEntry.xPostUrl);
    const host = document.getElementById(`x-embed-${openId}`);
    const xWidgets = (
      window as Window & {
        twttr?: {
          widgets?: {
            createTweet: (
              tweetId: string,
              element: HTMLElement,
              options?: Record<string, string | boolean>,
            ) => Promise<unknown>;
          };
        };
      }
    ).twttr?.widgets;

    if (!host || !xWidgets?.createTweet || !xPostId) {
      return;
    }

    host.innerHTML = '';
    void xWidgets.createTweet(xPostId, host, {
      align: 'left',
      dnt: true,
      theme: 'light',
    });
  }, [activeEntry, openId, xScriptReady]);

  const toggleArticle = (id: string) => {
    startTransition(() => {
      setOpenId((current) => (current === id ? null : id));
    });
  };

  return (
    <div className="page-shell writing-page">
      <Script
        src="https://platform.x.com/widgets.js"
        strategy="afterInteractive"
        onLoad={() => setXScriptReady(true)}
      />

      <header className="page-header-block writing-header">
        <p className="page-kicker">Notebook</p>
        <h1 className="page-title-display">{t('writing.pageTitle', 'Writing')}</h1>
        <p className="page-intro">
          {t(
            'writing.pageSubtitle',
            'Essays, notes, and research. A knowledge space in progress.',
          )}
        </p>
      </header>

      <section className="writing-stack">
        {writingEntries.map((entry, index) => {
          const isOpen = entry.id === openId;

          return (
            <article
              key={entry.id}
              className={`writing-accordion-item ${isOpen ? 'is-open' : ''}`}
            >
              <button
                type="button"
                className="writing-accordion-trigger"
                onClick={() => toggleArticle(entry.id)}
                aria-expanded={isOpen}
                aria-controls={`writing-panel-${entry.id}`}
              >
                <span className="writing-accordion-meta">
                  <small>{entry.eyebrow}</small>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </span>

                <span className="writing-accordion-title-wrap">
                  <span className="writing-accordion-title-row">
                    <span className="writing-accordion-title">{entry.title}</span>
                    {!!entry.date && (
                      <span className="writing-accordion-date">{entry.date}</span>
                    )}
                  </span>
                  {!!entry.summary && !entry.xPostUrl && (
                    <span className="writing-accordion-summary">{entry.summary}</span>
                  )}
                </span>

                <span className="writing-accordion-icon" aria-hidden="true">
                  {isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
                </span>
              </button>

              {isOpen && (
                <div
                  id={`writing-panel-${entry.id}`}
                  className="writing-accordion-panel"
                >
                  <div className="writing-accordion-body">
                    {entry.xPostUrl && (
                      <div id={`x-embed-${entry.id}`} className="writing-embed-shell" />
                    )}

                    {!!entry.markdown && (
                      <div className="writing-markdown">
                        {parseMarkdown(entry.markdown).map((block, blockIndex) => {
                          if (block.type === 'heading') {
                            if (block.level === 2) {
                              return <h2 key={`${entry.id}-block-${blockIndex}`}>{block.content}</h2>;
                            }

                            return <h3 key={`${entry.id}-block-${blockIndex}`}>{block.content}</h3>;
                          }

                          if (block.type === 'blockquote') {
                            return (
                              <blockquote key={`${entry.id}-block-${blockIndex}`}>
                                {block.lines.map((line, lineIndex) => (
                                  <p key={`${entry.id}-quote-${blockIndex}-${lineIndex}`}>{line}</p>
                                ))}
                              </blockquote>
                            );
                          }

                          return <p key={`${entry.id}-block-${blockIndex}`}>{block.content}</p>;
                        })}
                      </div>
                    )}

                    {!entry.markdown &&
                      entry.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
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

export default Writing;
