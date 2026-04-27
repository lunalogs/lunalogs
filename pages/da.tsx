import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { FiActivity, FiGlobe, FiKey, FiLogOut, FiMapPin, FiRefreshCcw, FiSearch, FiUsers } from 'react-icons/fi';
import { isDashboardAuthed, type DashboardData } from '../lib/analytics';

interface AnalyticsPageProps {
  authorized: boolean;
  initialStartDate: string;
  initialEndDate: string;
}

const formatDashboardDate = (value: string | null) => {
  if (!value) {
    return 'No traffic yet';
  }

  return new Intl.DateTimeFormat('en-CA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

const getDateInputValue = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  authorized,
  initialStartDate,
  initialEndDate,
}) => {
  const [isAuthed, setIsAuthed] = useState(authorized);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    startDate: initialStartDate,
    endDate: initialEndDate,
    source: 'all',
    path: 'all',
    query: '',
  });

  useEffect(() => {
    if (!isAuthed) {
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    setLoading(true);
    setError('');

    void fetch(`/api/da/visits?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || 'Unable to load analytics');
        }

        setData(payload);
      })
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') {
          return;
        }

        setError(fetchError.message || 'Unable to load analytics');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [filters, isAuthed]);

  const topDay = useMemo(() => {
    if (!data?.daily.length) {
      return 1;
    }

    return Math.max(...data.daily.map((entry) => entry.visits), 1);
  }, [data]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError('');

    const response = await fetch('/api/da/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setLoginError(payload.error || 'Wrong password');
      return;
    }

    setIsAuthed(true);
    setPassword('');
  };

  const handleLogout = async () => {
    await fetch('/api/da/logout', { method: 'POST' });
    setData(null);
    setIsAuthed(false);
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow,noarchive" />
      </Head>

      <div className="page-shell da-page">
        <header className="page-header-block da-header">
          <p className="page-kicker">Private Dashboard</p>
          <h1 className="page-title-display">Analytics</h1>
          <p className="page-intro">
            Daily traffic, visitor source, IP, and location for lunalogs.com.
          </p>
        </header>

        {!isAuthed ? (
          <section className="da-login-shell">
            <article className="content-block da-login-card">
              <div className="block-label">Protected</div>
              <h2>Enter dashboard password</h2>
              <p className="block-copy">
                This route is locked before it can load visit data.
              </p>

              <form className="da-login-form" onSubmit={handleLogin}>
                <label className="da-input-group">
                  <span>Password</span>
                  <div className="da-input-wrap">
                    <FiKey size={16} />
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter password"
                      autoComplete="current-password"
                    />
                  </div>
                </label>

                {loginError && <p className="da-error-text">{loginError}</p>}

                <button type="submit" className="da-button">
                  Unlock dashboard
                </button>
              </form>
            </article>
          </section>
        ) : (
          <section className="da-dashboard">
            <div className="da-toolbar">
              <div className="da-filter-grid">
                <label className="da-input-group">
                  <span>Start</span>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(event) =>
                      setFilters((current) => ({
                        ...current,
                        startDate: event.target.value,
                      }))
                    }
                  />
                </label>

                <label className="da-input-group">
                  <span>End</span>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(event) =>
                      setFilters((current) => ({
                        ...current,
                        endDate: event.target.value,
                      }))
                    }
                  />
                </label>

                <label className="da-input-group">
                  <span>Source</span>
                  <select
                    value={filters.source}
                    onChange={(event) =>
                      setFilters((current) => ({
                        ...current,
                        source: event.target.value,
                      }))
                    }
                  >
                    <option value="all">All sources</option>
                    {data?.sources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="da-input-group">
                  <span>Page</span>
                  <select
                    value={filters.path}
                    onChange={(event) =>
                      setFilters((current) => ({
                        ...current,
                        path: event.target.value,
                      }))
                    }
                  >
                    <option value="all">All pages</option>
                    {data?.paths.map((path) => (
                      <option key={path} value={path}>
                        {path}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="da-input-group da-search-group">
                  <span>Search</span>
                  <div className="da-input-wrap">
                    <FiSearch size={16} />
                    <input
                      type="search"
                      value={filters.query}
                      onChange={(event) =>
                        setFilters((current) => ({
                          ...current,
                          query: event.target.value,
                        }))
                      }
                      placeholder="IP, source, referrer..."
                    />
                  </div>
                </label>
              </div>

              <div className="da-toolbar-actions">
                <button
                  type="button"
                  className="da-ghost-button"
                  onClick={() => setFilters((current) => ({ ...current }))}
                >
                  <FiRefreshCcw size={14} />
                  Refresh
                </button>
                <button type="button" className="da-ghost-button" onClick={handleLogout}>
                  <FiLogOut size={14} />
                  Lock
                </button>
              </div>
            </div>

            {error && <p className="da-error-text">{error}</p>}

            <div className="da-metric-grid">
              <article className="content-block da-metric-card">
                <div className="block-label">Pageviews</div>
                <strong>{data?.summary.totalViews ?? 0}</strong>
                <span>
                  Total matching visits in this date range
                </span>
                <FiActivity size={18} />
              </article>

              <article className="content-block da-metric-card">
                <div className="block-label">Unique visitors</div>
                <strong>{data?.summary.uniqueVisitors ?? 0}</strong>
                <span>
                  Based on IP and user-agent fingerprint
                </span>
                <FiUsers size={18} />
              </article>

              <article className="content-block da-metric-card">
                <div className="block-label">Top source</div>
                <strong>{data?.summary.topSource ?? 'Direct'}</strong>
                <span>
                  Strongest traffic driver right now
                </span>
                <FiGlobe size={18} />
              </article>

              <article className="content-block da-metric-card">
                <div className="block-label">Last seen</div>
                <strong>{formatDashboardDate(data?.summary.lastSeenAt ?? null)}</strong>
                <span>
                  Most recent tracked visit
                </span>
                <FiMapPin size={18} />
              </article>
            </div>

            <div className="da-main-grid">
              <article className="content-block da-chart-card">
                <div className="block-label">Daily visits</div>
                <div className="da-chart-stack">
                  {data?.daily.length ? (
                    data.daily.map((entry) => (
                      <div key={entry.day} className="da-chart-row">
                        <div className="da-chart-label">
                          <strong>{entry.day}</strong>
                          <span>{entry.uniqueVisitors} visitors</span>
                        </div>
                        <div className="da-chart-track">
                          <span
                            className="da-chart-bar"
                            style={{
                              width: `${Math.max((entry.visits / topDay) * 100, 6)}%`,
                            }}
                          />
                        </div>
                        <div className="da-chart-value">{entry.visits}</div>
                      </div>
                    ))
                  ) : (
                    <p className="block-copy">
                      {loading ? 'Loading daily data...' : 'No visits match these filters yet.'}
                    </p>
                  )}
                </div>
              </article>

              <article className="content-block da-table-card">
                <div className="block-label">Recent visitors</div>
                <div className="da-table-wrap">
                  <table className="da-table">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Page</th>
                        <th>Source</th>
                        <th>IP</th>
                        <th>Location</th>
                        <th>Referrer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.rows.length ? (
                        data.rows.map((row) => (
                          <tr key={row.id}>
                            <td>{formatDashboardDate(row.recordedAt)}</td>
                            <td>{row.path}</td>
                            <td>{row.source}</td>
                            <td>{row.ip}</td>
                            <td>{row.locationLabel}</td>
                            <td className="da-referrer-cell">
                              {row.referrer || 'Direct'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="da-table-empty">
                            {loading ? 'Loading visits...' : 'No visits match the current filters.'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const authorized = isDashboardAuthed(req.headers.cookie);
  const today = getDateInputValue(new Date());
  const start = new Date();
  start.setDate(start.getDate() - 13);

  return {
    props: {
      authorized,
      initialStartDate: getDateInputValue(start),
      initialEndDate: today,
    },
  };
};

export default AnalyticsPage;
