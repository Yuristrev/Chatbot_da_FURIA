async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const userText = inputField.value.trim();
    if (userText === "") return;

    addMessage(userText, "user-message");
    inputField.value = "";

    const loadingMessage = document.createElement("div");
    loadingMessage.className = "message bot-message";
    loadingMessage.innerText = "Digitando...";
    document.getElementById("chatbox").appendChild(loadingMessage);
    document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;

    setTimeout(async () => {
        loadingMessage.remove();
        const botResponse = await getBotResponse(userText);
        addMessage(botResponse, "bot-message");
    }, 1000);
}

async function getBotResponse(input) {
    input = input.toLowerCase();

    try {
        if (input.includes("informação") || input.includes("furia")) {
            const res = await fetch('/api/team');
            const data = await res.json();
            return `A equipe ${data.team} foi fundada em ${data.founded}. Baseada em ${data.location}.`;

        } else if (input.includes("próximos jogos") || input.includes("futuro")) {
            const res = await fetch('/api/upcoming');
            const data = await res.json();
            if (data.length === 0) return "Nenhuma partida futura encontrada.";
            return data.map(match => `Vs ${match.opponent} em ${match.date}`).join("\n");

        } else if (input.includes("últimos jogos") || input.includes("anteriores")) {
            const res = await fetch('/api/past');
            const data = await res.json();
            if (data.length === 0) return "Nenhuma partida anterior encontrada.";
            return data.map(match => `${match.result} contra ${match.opponent}`).join("\n");

        } else if (input.includes("agora") || input.includes("ao vivo")) {
            const res = await fetch('/api/live');
            const data = await res.json();
            if (data.length === 0) return "A FURIA não está jogando no momento.";
            return `Partida AO VIVO contra ${data.opponent}!`;
        } else {
            return "Não entendi. Pergunte sobre informações, próximos jogos, jogos anteriores ou partidas ao vivo!";
        }
    } catch (error) {
        console.error(error);
        return "Erro ao consultar o servidor.";
    }
}

function addMessage(message, className) {
    const chatbox = document.getElementById("chatbox");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${className}`;
    messageDiv.innerText = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}
