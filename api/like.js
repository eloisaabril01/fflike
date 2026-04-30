// Vercel Serverless Function — proxies the like API to fix CORS
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { uid, server_name } = req.query;

  if (!uid || !server_name) {
    return res.status(400).json({ error: 'Missing uid or server_name' });
  }

  try {
    const url = `https://sneha-like-api-ixc1.vercel.app/like?uid=${uid}&server_name=${server_name}`;
    const response = await fetch(url);

    // Check if upstream returned a valid response
    if (!response.ok) {
      return res.status(502).json({
        error: `Upstream API error: ${response.status} ${response.statusText}`
      });
    }

    const text = await response.text();

    // Safely parse JSON — upstream sometimes returns non-JSON on errors
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(502).json({
        error: 'Upstream returned non-JSON: ' + text.slice(0, 200)
      });
    }

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
