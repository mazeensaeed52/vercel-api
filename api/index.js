const crypto = require('crypto');

function reqId() {
  return crypto.randomBytes(3).toString('hex');
}

module.exports = (req, res) => {
  const id = reqId();
  const start = Date.now();

  // Vercel already parses query params
  const { target } = req.query;

  // 1. Validation
  if (!target) {
    return res.status(400).send('Missing target');
  }

  res.setHeader('Location', target);
};
