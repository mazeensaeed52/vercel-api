const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

function reqId() {
  return crypto.randomBytes(3).toString('hex');
}

app.post('/api', (req, res) => {
  const id = reqId();
  const target = req.query.target;
  const start = Date.now();

  console.log('\n==============================');
  console.log('[ID]', id);
  console.log('[TIME]', new Date().toISOString());
  console.log('[FROM IP]', req.ip);
  console.log('[REDIRECT TARGET]', target);

  if (!target) {
    return res.status(400).send('Missing target');
  }

  // IMPORTANT: explicitly end response
  res.status(302)
     .set('Location', target)
     .end();

  res.on('finish', () => {
    const duration = Date.now() - start;

    console.log('[FINISHED]', id);
    console.log('[DURATION]', duration, 'ms');

    if (duration > 8000) {
      console.log('[RESULT] 🔥 Blind SSRF very likely');
    } else if (duration > 1500) {
      console.log('[RESULT] ⚠️ Possible internal filtering');
    } else {
      console.log('[RESULT] ✅ Port open');
    }
  });
});

app.get('/', (_, res) => {
  res.send('SSRF test server running');
});

module.exports = app;
