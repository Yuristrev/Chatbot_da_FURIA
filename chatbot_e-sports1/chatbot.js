function addMessage(message, className) {
    const chatbox = document.getElementById("chatbox");
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${className}`;
  
    if (message.includes("<a ")) {
      msgDiv.innerHTML = message;
    } else {
      msgDiv.innerText = message;
    }
  
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
  }
  
  async function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (text === "") return;
  
    addMessage(text, "user-message");
    input.value = "";
  
    addMessage("Digitando...", "bot-message");
  
    const response = await getBotResponse(text);
  
    const messages = document.querySelectorAll(".bot-message");
    messages[messages.length-1].remove();
  
    addMessage(response, "bot-message");
  }
  
  async function getBotResponse(input) {
    input = input.toLowerCase();
  
    try {
      if (["informação", "informações", "sobre a equipe", "dados"].some(k => input.includes(k))) {
        const res = await fetch("/api/team");
        const data = await res.json();
        return `A equipe ${data.team} foi fundada em ${data.founded}, baseada em ${data.location}.`;
  
      } else if (["jogadores", "jogador", "elenco"].some(k => input.includes(k))) {
        const res = await fetch("/api/players");
        const data = await res.json();
        return `Jogadores da FURIA:\n${data.join("\n")}`;
  
      } else if (["campeonatos", "torneios"].some(k => input.includes(k))) {
        const res = await fetch("/api/tournaments");
        const data = await res.json();
        return `Campeonatos atuais:\n${data.join("\n")}`;
  
      } else if (["títulos", "conquistas"].some(k => input.includes(k))) {
        const res = await fetch("/api/titles");
        const data = await res.json();
        return `Títulos da FURIA:\n${data.join("\n")}`;
  
      } else if (["próximos jogos", "futuro"].some(k => input.includes(k))) {
        const res = await fetch("/api/upcoming");
        const data = await res.json();
        if (!data.length) return "Nenhuma partida futura encontrada.";
        return data.map(m => `Vs ${m.opponent} em ${m.date}`).join("\n");
  
      } else if (["últimos jogos", "anteriores"].some(k => input.includes(k))) {
        const res = await fetch("/api/past");
        const data = await res.json();
        if (!data.length) return "Nenhuma partida anterior encontrada.";
        return data.map(m => `${m.result} contra ${m.opponent}`).join("\n");
  
      } else if (["ao vivo", "agora"].some(k => input.includes(k))) {
        const res = await fetch("/api/live");
        const data = await res.json();
        return data.length ? `Partida AO VIVO contra ${data[0].opponent}` : "Sem partidas ao vivo no momento.";
  
      } else if (["loja", "site oficial", "comprar"].some(k => input.includes(k))) {
        return `Quer garantir seu manto ou merch da FURIA? <a href="https://www.furia.gg/" target="_blank" style="color: #2e8b57; text-decoration: underline;">Clique aqui e acesse a loja oficial</a>.`;
  
      } else {
        return "Não entendi, guerreiro! Tente perguntar: informações, jogadores, campeonatos, títulos, próximos jogos, últimos jogos, ao vivo ou loja.";
      }
  
    } catch (err) {
      console.error(err);
      return "Erro ao consultar servidor.";
    }
  }
  
  window.onload = () => {
    addMessage("Eai guerreiro, vi que você tá atrás de informação sobre a equipe FURIA. Se é isso, veio ao lugar certo. Fala aí, o que você quer saber?", "bot-message");
    addMessage("📋 Opções disponíveis:\n• Informações\n• Jogadores\n• Campeonatos\n• Títulos\n• Próximos jogos\n• Últimos jogos\n• Ao vivo\n• Loja", "bot-message");
  };
  