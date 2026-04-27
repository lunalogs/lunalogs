import type { NextApiRequest, NextApiResponse } from 'next';
import { trackVisit, type VisitPayload } from '../../../lib/analytics';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload =
      typeof req.body === 'string'
        ? (JSON.parse(req.body || '{}') as VisitPayload)
        : ((req.body || {}) as VisitPayload);

    if ((payload.path || '').startsWith('/da')) {
      return res.status(204).end();
    }

    const record = await trackVisit(payload, req);
    return res.status(200).json({ ok: true, id: record.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to store analytics event.';

    return res.status(202).json({
      ok: false,
      skipped: true,
      error: message,
    });
  }
}
