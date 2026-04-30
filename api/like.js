// Proxy for like API - CommonJS syntax for Vercel compatibility
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { uid, server_name } = req.query;

  if (!uid || !server_name) {
    res.status(400).json({ error: 'Missing uid or server_name', received: req.query });
    return;
  }

  const targetUrl = `https://sneha-like-api-ixc1.vercel.app/like?uid=${encodeURIComponent(uid)}&server_name=${encodeURIComponent(server_name)}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      res.status(200).json({ error: 'Invalid JSON from upstream', raw: text, upstreamStatus: response.status });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      type: err.constructor.name,
      target: targetUrl
    });
  }
};
