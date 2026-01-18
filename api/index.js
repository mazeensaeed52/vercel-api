module.exports = (req, res) => {
  console.log('[API HIT]', new Date().toISOString());

  // Redirect back to our own server
  res.statusCode = 302;
  res.setHeader('Location', 'https://vercel-api-nzkk.vercel.app/second');
  res.end();
};
