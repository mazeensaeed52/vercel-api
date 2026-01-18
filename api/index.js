const crypto = require('crypto');

function reqId() {
  return crypto.randomBytes(3).toString('hex');
}

module.exports = (req, res) => {
  const { target } = req.query;

  if (!target) {
    return res.status(400).send('Missing target');
  }

  // Send redirect AND end response
  res.statusCode = 302;
  res.setHeader('Location', target);
  res.end();
};
