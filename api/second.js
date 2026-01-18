module.exports = (req, res) => {
  console.log('🔥 [SECOND HIT] Redirect was followed!');
  console.log('TIME:', new Date().toISOString());
  console.log('METHOD:', req.method);
  console.log('IP:', req.headers['x-forwarded-for'] || req.socket.remoteAddress);

  res.status(200).send('Redirect followed');
};
