import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createAuthCookie,
  verifyDashboardPassword,
} from '../../../lib/analytics';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const password = String(req.body?.password || '');

  if (!verifyDashboardPassword(password)) {
    return res.status(401).json({ error: 'Wrong password' });
  }

  res.setHeader('Set-Cookie', createAuthCookie());
  return res.status(200).json({ ok: true });
}
