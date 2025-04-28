const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(__dirname));

app.get('/api/team', (req, res) => {
  res.json({
    team: "FURIA Esports",
    founded: "2017",
    location: "Brasil"
  });
});

app.get('/api/upcoming', (req, res) => {
  res.json([
    { opponent: "Team Liquid", date: "10/05/2025" },
    { opponent: "NAVI", date: "15/05/2025" }
  ]);
});

app.get('/api/past', (req, res) => {
  res.json([
    { opponent: "G2 Esports", result: "Vitória" },
    { opponent: "FaZe Clan", result: "Derrota" }
  ]);
});

app.get('/api/live', (req, res) => {
  res.json([]);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});