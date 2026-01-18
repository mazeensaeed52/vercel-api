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

  // 1. Validation first
  if (!target) {
    return res.status(400).send('Missing target');
  }

  // 2. Logging BEFORE ending the response
  console.log(`[ID] ${id} | [TARGET] ${target} | [FROM] ${req.ip}`);

  // 3. SSRF Result Calculation (Synchronous)
  const duration = Date.now() - start;
  let result = "✅ Port open";
  if (duration > 8000) result = "🔥 Blind SSRF very likely";
  else if (duration > 1500) result = "⚠️ Possible internal filtering";
  
  console.log(`[RESULT] ${id}: ${result} (${duration}ms)`);

  // 4. Send response and STOP
  // Use 302 for redirection
  res.setHeader('Location', target);
  return res.status(302).end();
});

module.exports = app;
