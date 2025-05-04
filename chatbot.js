const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");

// Função para adicionar mensagens ao chat
function addMessage(text, sender = "bot") {
  const message = document.createElement("div");
  message.classList.add("message");
  message.classList.add(sender === "user" ? "user-message" : "bot-message");
  message.innerHTML = text;
  chatbox.appendChild(message);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Função principal para processar entrada do usuário
function sendMessage(text = null) {
  const input = text || userInput.value.trim();
  if (!input) return;

  addMessage(input, "user");
  userInput.value = "";

  const response = getBotResponse(input.toLowerCase());
  addMessage(response);
}

// Lógica das respostas do bot
function getBotResponse(input) {
  if (input.includes("elenco") || input.includes("jogadores")) {
    return `O elenco atual de CS:GO da FURIA (2025) é:
    <ul>
      <li>FalleN (Gabriel Sguario)</li>
      <li>yuurih (Yuri Santos)</li>
      <li>KSCERATO (Kaike Cerato)</li>
      <li>molodoy (Danil Golubenko)</li>
      <li>YEKINDAR (Mareks Gaļinskis) *substituto</li>
      <li>chelo (Marcelo Cespedes) *inativo</li>
    </ul>`;
  } else if (input.includes("próximo jogo") || input.includes("quando joga")) {
    return "O próximo jogo da FURIA será no dia 10 de maio contra a Team Liquid às 18h (horário de Brasília).";
  } else if (input.includes("último jogo") || input.includes("última partida")) {
    return "O último jogo da FURIA foi em 6 de abril de 2025, com uma vitória por 2 a 0 contra a Apogee Esports.";
  } else if (input.includes("títulos") || input.includes("conquistas")) {
    return `A FURIA possui diversos títulos, incluindo:
    <ul>
      <li>Campeã da ESL Pro League Season 12: América do Norte (2020)</li>
      <li>Campeã da DreamHack Masters Spring: América do Norte (2020)</li>
      <li>Campeã da DreamHack Open Summer: América do Norte (2020)</li>
      <li>Campeã da BGS 2023 (masculino e feminino)</li>
    </ul>`;
  } else if (input.includes("ranking") || input.includes("posição")) {
    return "Atualmente, a FURIA ocupa a 9ª posição no ranking mundial atualmente";
  } else if (input.includes("história") || input.includes("sobre a furia")) {
    return "A FURIA Esports é uma organização brasileira fundada em 2017. É uma das equipes mais tradicionais do cenário competitivo de CS:GO.";
  } else if (input.includes("jogo ao vivo")) {
    return `Você pode assistir ao jogo ao vivo neste link: <a href="https://www.twitch.tv/furia" target="_blank">Twitch da FURIA</a>`;
  } else if (input.includes("loja")) {
    return `🔥🔥Quer garantir seu manto ou merch da FURIA pra ficar no estilo? Cola aí <a href="https://shop.furia.gg" target="_blank">shop.furia.gg</a>🔥🔥`;
  } else {
    return `Eai guerreiro, vi que você tá atrás de informação sobre a equipe de CS da FURIA. Se é isso, veio ao lugar certo. Fala aí, o que você quer saber?
      <div class="options">
        <button class="option-button" onclick="sendMessage('elenco')">👨‍💻🧍 Elenco Atual</button>
        <button class="option-button" onclick="sendMessage('próximo jogo')">🔴⏭️ Próximo Jogo</button>
        <button class="option-button" onclick="sendMessage('último jogo')">🔴⏮️ Último Jogo</button>
        <button class="option-button" onclick="sendMessage('títulos')">🏆🆚 Títulos</button>
        <button class="option-button" onclick="sendMessage('ranking')">📊🥇 Ranking</button>
        <button class="option-button" onclick="sendMessage('história')">📜🎞️ História da FURIA</button>
        <button class="option-button" onclick="sendMessage('jogo ao vivo')">🟢🎥 Ver Jogo ao Vivo</button>
        <button class="option-button" onclick="sendMessage('loja')">💸🖥️ Ir para a Loja</button>
      </div>`;
  }
}
