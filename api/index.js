module.exports = (req, res) => {
  console.log('[API HIT]', new Date().toISOString());

  // 2 MB = 2 * 1024 * 1024 bytes
  const sizeInBytes = 1 * 1024 * 1024;

  // Create a string of 'A' characters
  const responseBody = 'A'.repeat(sizeInBytes);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(responseBody));
  res.end(responseBody);
};
