const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(__dirname));

// Dados atualizados manualmente (maio/2025)
const teamData = {
  name: "FURIA Esports",
  ranking: 22,
  location: "Brasil",
  players: [
    "FalleN (Gabriel Sguario)",
    "yuurih (Yuri Santos)",
    "KSCERATO (Kaike Cerato)",
    "molodoy (Danil Golubenko)",
    "YEKINDAR (Mareks Gaļinskis) *substituto",
    "chelo (Marcelo Cespedes) *inativo"
  ],
  coach: "guerri (Nicholas Nogueira)",
  logo: "furia.jpg"
};

const tournaments = [
  "ESL Pro League Season 19",
  "IEM Dallas 2025",
  "CBCS Elite League Season 1"
];

const titles = [
  "ESL Pro League Season 12 NA",
  "CBCS Elite League Season 1"
];

const upcomingMatches = [
  { opponent: "Complexity", date: "12/05/2025" }
];

const pastMatches = [
  { opponent: "FaZe Clan", result: "Derrota" }
];

// Rotas da API com dados fixos

app.get('/api/team', (req, res) => {
  res.json(teamData);
});

app.get('/api/players', (req, res) => {
  res.json(teamData.players);
});

app.get('/api/tournaments', (req, res) => {
  res.json(tournaments);
});

app.get('/api/titles', (req, res) => {
  res.json(titles);
});

app.get('/api/upcoming', (req, res) => {
  res.json(upcomingMatches);
});

app.get('/api/past', (req, res) => {
  res.json(pastMatches);
});

app.get('/api/live', (req, res) => {
  res.json([]); // Nenhuma partida ao vivo no momento
});

// Servir o index.html para qualquer outra rota
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
