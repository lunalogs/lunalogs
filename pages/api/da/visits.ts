import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getDashboardData,
  isDashboardAuthed,
} from '../../../lib/analytics';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isDashboardAuthed(req.headers.cookie)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const data = await getDashboardData({
      startDate: typeof req.query.startDate === 'string' ? req.query.startDate : '',
      endDate: typeof req.query.endDate === 'string' ? req.query.endDate : '',
      source: typeof req.query.source === 'string' ? req.query.source : 'all',
      path: typeof req.query.path === 'string' ? req.query.path : 'all',
      query: typeof req.query.query === 'string' ? req.query.query : '',
    });

    return res.status(200).json(data);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to load analytics right now.';

    return res.status(503).json({ error: message });
  }
}
