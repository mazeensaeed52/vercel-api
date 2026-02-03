module.exports = (req, res) => {
  const entries = [];

  for (let i = 0; i < 15000; i++) {
    entries.push({
      id: i,
      name: "webhook_event_" + i,
      payload: {
        a: "A".repeat(1500),
        b: "B".repeat(1500),
        c: "C".repeat(1500)
      }
    });
  }

  const response = {
    status: "ok",
    timestamp: Date.now(),
    data: entries
  };

  res.status(200).json(response);
};
