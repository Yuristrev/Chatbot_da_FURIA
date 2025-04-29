const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(__dirname));

app.get('/api/team', (req, res) => {
  res.json({
    team: "FURIA Esports",
    founded: "2017",
    location: "Brasil"
  });
});

app.get('/api/players', (req, res) => {
  res.json(["KSCERATO", "yuurih", "chelo", "drop", "arT"]);
});

app.get('/api/tournaments', (req, res) => {
  res.json(["IEM Dallas 2025", "BLAST Premier Spring Finals 2025"]);
});

app.get('/api/titles', (req, res) => {
  res.json(["CBCS Elite League S1", "DreamHack Open Summer 2020 NA"]);
});

app.get('/api/upcoming', (req, res) => {
  res.json([{ opponent: "NAVI", date: "10/05/2025" }]);
});

app.get('/api/past', (req, res) => {
  res.json([{ opponent: "FaZe Clan", result: "Vitória" }]);
});

app.get('/api/live', (req, res) => {
  res.json([]);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
