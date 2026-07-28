// Vercel serverless function. Returns the Supabase config ONLY when the
// correct PIN is provided. Values come from Vercel Environment Variables,
// never from the repo. Set these in Vercel → Settings → Environment Variables:
//   APP_PIN, SUPABASE_URL, SUPABASE_KEY, SHOP_CODE, SYNC_TOKEN (optional)
module.exports = (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  if (!body || typeof body !== 'object') body = {};
  const pin = body.pin != null ? String(body.pin) : '';
  const APP_PIN = process.env.APP_PIN || '';
  if (!APP_PIN || pin !== APP_PIN) { res.status(401).json({ error: 'bad_pin' }); return; }
  res.status(200).json({
    url:  process.env.SUPABASE_URL || '',
    key:  process.env.SUPABASE_KEY || '',
    shop: process.env.SHOP_CODE || '',
    syncToken: String(process.env.SYNC_TOKEN || 'true') === 'true'
  });
};
