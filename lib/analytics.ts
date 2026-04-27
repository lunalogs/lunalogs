import crypto from 'crypto';
import type { NextApiRequest } from 'next';

const ANALYTICS_COOKIE = 'lunalogs_da';
const ANALYTICS_COOKIE_MAX_AGE = 60 * 60 * 12;
const ANALYTICS_TIMEZONE = 'America/Toronto';
const ANALYTICS_PREFIX = 'analytics/visits/';
const DEFAULT_DASHBOARD_PASSWORD = 'luna888';
const DEFAULT_LOOKBACK_DAYS = 30;

export interface VisitPayload {
  path?: string;
  referrer?: string;
  title?: string;
  utmSource?: string;
}

export interface VisitRecord {
  id: string;
  recordedAt: string;
  dayKey: string;
  path: string;
  title: string;
  referrer: string;
  source: string;
  sourceType: 'direct' | 'internal' | 'referral' | 'utm';
  ip: string;
  visitorKey: string;
  userAgent: string;
  locationLabel: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
}

export interface DashboardFilters {
  startDate?: string;
  endDate?: string;
  source?: string;
  path?: string;
  query?: string;
}

export interface DashboardData {
  rows: VisitRecord[];
  daily: Array<{
    day: string;
    visits: number;
    uniqueVisitors: number;
  }>;
  sources: string[];
  paths: string[];
  summary: {
    totalViews: number;
    uniqueVisitors: number;
    topSource: string;
    lastSeenAt: string | null;
  };
}

const ensureAnalyticsConfigured = () => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      'Analytics storage is not configured yet. Add a Vercel Blob store to this project so BLOB_READ_WRITE_TOKEN is available.',
    );
  }
};

const getBlobSdk = async () => import('@vercel/blob');

const formatDayKey = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: ANALYTICS_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

const sha = (value: string) =>
  crypto.createHash('sha256').update(value).digest('hex');

const getClientIp = (req: NextApiRequest) => {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const ip = raw?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';

  return ip.replace(/^::ffff:/, '');
};

const getHeader = (req: NextApiRequest, key: string) => {
  const value = req.headers[key];
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
};

const normalizePath = (path?: string) => {
  if (!path) {
    return '/';
  }

  try {
    const url = path.startsWith('http')
      ? new URL(path)
      : new URL(path, 'https://lunalogs.com');

    return url.pathname || '/';
  } catch {
    return path.startsWith('/') ? path : `/${path}`;
  }
};

const prettifyHost = (host: string) => {
  const cleanHost = host.replace(/^www\./, '').toLowerCase();

  if (cleanHost.includes('linkedin.com')) return 'LinkedIn';
  if (cleanHost.includes('twitter.com') || cleanHost.includes('x.com')) return 'X';
  if (cleanHost.includes('github.com')) return 'GitHub';
  if (cleanHost.includes('google.')) return 'Google';
  if (cleanHost.includes('bing.com')) return 'Bing';
  if (cleanHost.includes('substack.com')) return 'Substack';

  const [first = cleanHost] = cleanHost.split('.');
  return first ? `${first.charAt(0).toUpperCase()}${first.slice(1)}` : 'External';
};

const getSource = (path: string, referrer: string, utmSource?: string) => {
  if (utmSource?.trim()) {
    return {
      source: utmSource.trim(),
      sourceType: 'utm' as const,
    };
  }

  if (!referrer) {
    return {
      source: 'Direct',
      sourceType: 'direct' as const,
    };
  }

  try {
    const refUrl = new URL(referrer);
    const refHost = refUrl.hostname.replace(/^www\./, '').toLowerCase();

    if (refHost.includes('lunalogs.com')) {
      return {
        source: path.startsWith('/da') ? 'Dashboard' : 'Internal',
        sourceType: 'internal' as const,
      };
    }

    return {
      source: prettifyHost(refHost),
      sourceType: 'referral' as const,
    };
  } catch {
    return {
      source: 'External',
      sourceType: 'referral' as const,
    };
  }
};

const getLocation = (req: NextApiRequest) => {
  const city = getHeader(req, 'x-vercel-ip-city');
  const region = getHeader(req, 'x-vercel-ip-country-region');
  const country = getHeader(req, 'x-vercel-ip-country');
  const countryCode = getHeader(req, 'x-vercel-ip-country-code');
  const locationLabel =
    [city, region, country].filter(Boolean).join(', ') || 'Unknown';

  return {
    city,
    region,
    country,
    countryCode,
    locationLabel,
  };
};

const getSessionToken = () => {
  const password = process.env.DA_PASSWORD || DEFAULT_DASHBOARD_PASSWORD;
  return sha(`lunalogs-da:${password}`);
};

const parseCookies = (cookieHeader?: string) => {
  return (cookieHeader || '')
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, part) => {
      const [key, ...rest] = part.split('=');
      acc[key] = decodeURIComponent(rest.join('=') || '');
      return acc;
    }, {});
};

const pathnameToRecord = async (pathname: string) => {
  const { get } = await getBlobSdk();
  const response = await get(pathname, { access: 'private' });

  if (response.statusCode !== 200 || !response.stream) {
    return null;
  }

  return new Response(response.stream).json() as Promise<VisitRecord>;
};

const matchesFilters = (record: VisitRecord, filters: DashboardFilters) => {
  if (filters.startDate && record.dayKey < filters.startDate) {
    return false;
  }

  if (filters.endDate && record.dayKey > filters.endDate) {
    return false;
  }

  if (filters.source && filters.source !== 'all' && record.source !== filters.source) {
    return false;
  }

  if (filters.path && filters.path !== 'all' && record.path !== filters.path) {
    return false;
  }

  if (filters.query?.trim()) {
    const query = filters.query.trim().toLowerCase();
    const haystack = [
      record.ip,
      record.path,
      record.source,
      record.referrer,
      record.locationLabel,
      record.countryCode,
      record.title,
    ]
      .join(' ')
      .toLowerCase();

    if (!haystack.includes(query)) {
      return false;
    }
  }

  return true;
};

export const createAuthCookie = () =>
  `${ANALYTICS_COOKIE}=${encodeURIComponent(getSessionToken())}; Path=/; Max-Age=${ANALYTICS_COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;

export const clearAuthCookie = () =>
  `${ANALYTICS_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;

export const isDashboardAuthed = (cookieHeader?: string) =>
  parseCookies(cookieHeader)[ANALYTICS_COOKIE] === getSessionToken();

export const verifyDashboardPassword = (password?: string) =>
  (password || '') === (process.env.DA_PASSWORD || DEFAULT_DASHBOARD_PASSWORD);

export const trackVisit = async (
  payload: VisitPayload,
  req: NextApiRequest,
) => {
  ensureAnalyticsConfigured();

  const recordedAt = new Date();
  const dayKey = formatDayKey(recordedAt);
  const path = normalizePath(payload.path);
  const referrer = payload.referrer?.trim() || getHeader(req, 'referer');
  const { source, sourceType } = getSource(path, referrer, payload.utmSource);
  const ip = getClientIp(req);
  const title = payload.title?.trim() || path;
  const location = getLocation(req);
  const userAgent = getHeader(req, 'user-agent');
  const id = crypto.randomUUID();

  const record: VisitRecord = {
    id,
    recordedAt: recordedAt.toISOString(),
    dayKey,
    path,
    title,
    referrer,
    source,
    sourceType,
    ip,
    visitorKey: sha(`${ip}:${userAgent}`),
    userAgent,
    ...location,
  };

  const pathname = `${ANALYTICS_PREFIX}${dayKey}/${recordedAt.getTime()}-${id}.json`;
  const { put } = await getBlobSdk();

  await put(pathname, JSON.stringify(record), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType: 'application/json',
  });

  return record;
};

export const getDashboardData = async (
  filters: DashboardFilters,
): Promise<DashboardData> => {
  ensureAnalyticsConfigured();
  const { list } = await getBlobSdk();

  const blobs = [];
  let cursor: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const result = await list({
      prefix: ANALYTICS_PREFIX,
      limit: 1000,
      cursor,
    });

    blobs.push(...result.blobs);
    cursor = result.cursor;
    hasMore = result.hasMore;
  }

  const records = (
    await Promise.all(blobs.map((blob) => pathnameToRecord(blob.pathname)))
  )
    .filter(Boolean)
    .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt)) as VisitRecord[];

  const today = formatDayKey(new Date());
  const fallbackStart = new Date();
  fallbackStart.setDate(fallbackStart.getDate() - DEFAULT_LOOKBACK_DAYS + 1);

  const normalizedFilters: DashboardFilters = {
    startDate: filters.startDate || formatDayKey(fallbackStart),
    endDate: filters.endDate || today,
    source: filters.source || 'all',
    path: filters.path || 'all',
    query: filters.query || '',
  };

  const filteredRows = records.filter((record) =>
    matchesFilters(record, normalizedFilters),
  );

  const dailyMap = new Map<string, { visits: number; visitors: Set<string> }>();

  filteredRows.forEach((record) => {
    const current = dailyMap.get(record.dayKey) || {
      visits: 0,
      visitors: new Set<string>(),
    };

    current.visits += 1;
    current.visitors.add(record.visitorKey);
    dailyMap.set(record.dayKey, current);
  });

  const daily = Array.from(dailyMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([day, value]) => ({
      day,
      visits: value.visits,
      uniqueVisitors: value.visitors.size,
    }));

  const sourceCounts = filteredRows.reduce<Record<string, number>>((acc, record) => {
    acc[record.source] = (acc[record.source] || 0) + 1;
    return acc;
  }, {});

  const topSource = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Direct';
  const uniqueVisitors = new Set(filteredRows.map((record) => record.visitorKey)).size;

  return {
    rows: filteredRows,
    daily,
    sources: Array.from(new Set(records.map((record) => record.source))).sort(),
    paths: Array.from(new Set(records.map((record) => record.path))).sort(),
    summary: {
      totalViews: filteredRows.length,
      uniqueVisitors,
      topSource,
      lastSeenAt: filteredRows[0]?.recordedAt || null,
    },
  };
};
