const JSONBIN_BASE = 'https://api.jsonbin.io/v3/b';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const BIN_ID = process.env.JSONBIN_BIN_ID;
  const API_KEY = process.env.JSONBIN_API_KEY;

  if (!BIN_ID || !API_KEY) {
    return res.status(500).json({ error: 'Missing JSONBIN_BIN_ID or JSONBIN_API_KEY env vars.' });
  }

  const headers = {
    'Content-Type': 'application/json',
    'X-Master-Key': API_KEY,
    'X-Bin-Versioning': 'false'
  };

  if (req.method === 'GET') {
    try {
      const r = await fetch(`${JSONBIN_BASE}/${BIN_ID}/latest`, { headers });
      const json = await r.json();
      return res.status(200).json(json.record || {});
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const r = await fetch(`${JSONBIN_BASE}/${BIN_ID}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      });
      const json = await r.json();
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
