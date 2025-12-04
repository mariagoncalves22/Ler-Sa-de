// Simple mock API for Ler+Saúde demo
// Run: npm install express cors && node server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.post('/explain', (req, res) => {
  const text = (req.body.text || '').slice(0, 1000);
  const summary = `Resumo automático: ${text.substring(0, 220)}...`; 
  const suggestions = `Sugestões: Rever com equipa clínica; considerar exames adicionais.`;
  res.json({ summary, suggestions, confidence: 0.92 });
});

// Persist lead in mock storage
async function saveJson(file, entry) {
  try {
    const full = path.join(__dirname, file);
    let data = [];
    try {
      const existing = await fs.readFile(full, 'utf8');
      data = JSON.parse(existing || '[]');
    } catch (e) {
      data = [];
    }
    data.push(entry);
    await fs.writeFile(full, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Failed to save json', file, e.message);
    return false;
  }
}

app.post('/leads', async (req, res) => {
  const entry = { body: req.body, ts: new Date().toISOString() };
  const ok = await saveJson('leads.json', entry);
  console.log('Lead received:', entry);
  res.json({ ok });
});

app.post('/analytics', async (req, res) => {
  const entry = { body: req.body, ts: new Date().toISOString() };
  const ok = await saveJson('analytics.json', entry);
  console.log('Analytics event:', entry);
  res.json({ ok });
});

// Read stored logs (debug)
app.get('/leads', async (req, res) => {
  try {
    const p = path.join(__dirname, 'leads.json');
    const content = await fs.readFile(p, 'utf8');
    res.json(JSON.parse(content || '[]'));
  } catch (e) {
    res.json([]);
  }
});

app.get('/analytics', async (req, res) => {
  try {
    const p = path.join(__dirname, 'analytics.json');
    const content = await fs.readFile(p, 'utf8');
    res.json(JSON.parse(content || '[]'));
  } catch (e) {
    res.json([]);
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Mock API listening on http://localhost:${port}`));
