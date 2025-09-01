const express = require('express');
const client = require('prom-client');
const app = express();
const PORT = process.env.PORT || 3000;

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const counter = new client.Counter({
  name: 'my_app_requests_total',
  help: 'Total number of requests',
});

app.get('/', (req, res) => {
  counter.inc();
  res.send('Hello from Node.js with Prometheus!');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
