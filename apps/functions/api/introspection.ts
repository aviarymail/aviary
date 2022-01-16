import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  });
}
