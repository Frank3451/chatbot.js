<script>
document.addEventListener("DOMContentLoaded", function () {
    // Creazione icona di apertura chat
    const chatIcon = document.createElement("div");
    chatIcon.id = "chat-icon";
    chatIcon.innerHTML = "💬";
    document.body.appendChild(chatIcon);

    // Creazione chatbot (inizialmente nascosto)
    const chatWidget = document.createElement("div");
    chatWidget.id = "chat-container";
    chatWidget.innerHTML = `
        <div id="chat-box">
            <div id="chat-header">
                <span>💬 Chat con Carla</span>
                <button id="close-chat">&times;</button>
            </div>
            <div id="chat-log"></div>
            <div id="chat-input-container">
                <input type="text" id="chat-input" placeholder="Scrivi un messaggio...">
                <button id="send-button">➤</button>
            </div>
        </div>
    `;
    document.body.appendChild(chatWidget);

    // Caricare conversazioni precedenti
    const chatLog = document.getElementById("chat-log");
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
        chatLog.innerHTML = savedMessages;
    }

    // Funzione per inviare messaggio
    document.getElementById("send-button").addEventListener("click", async function () {
        const input = document.getElementById("chat-input");
        const userMessage = input.value.trim();
        if (!userMessage) return;

        chatLog.innerHTML += `<div class="user-message"><b>Tu:</b> ${userMessage}</div>`;
        input.value = "";
        chatLog.scrollTop = chatLog.scrollHeight;

        const response = await fetch("https://carla-backend.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        chatLog.innerHTML += `<div class="bot-message"><b>Carla:</b> ${data.reply}</div>`;
        chatLog.scrollTop = chatLog.scrollHeight;

        // Salvare i messaggi in localStorage
        localStorage.setItem("chatMessages", chatLog.innerHTML);
    });

    // Mostrare/nascondere il chatbot
    chatIcon.addEventListener("click", function () {
        chatWidget.style.display = "block";
        chatIcon.style.display = "none";
    });

    document.getElementById("close-chat").addEventListener("click", function () {
        chatWidget.style.display = "none";
        chatIcon.style.display = "flex";
    });
});
</script>

<style>
/* Icona di apertura */
#chat-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #0d6efd; /* Colore adattato al footer */
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex !important;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    z-index: 9999;
}

/* Contenitore chatbot */
#chat-container {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 320px;
    background: white;
    border-radius: 15px;
    padding: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    display: none;
    z-index: 10000;
    font-size: 13px; /* Caratteri più piccoli */
}

/* Header chat */
#chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #34606B; /* Colore aggiornato */
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
}

#close-chat {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
}

/* Chat log */
#chat-log {
    height: 250px;
    overflow-y: auto;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

/* Icona di apertura */
#chat-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #0d6efd; /* Colore adattato al footer */
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex !important;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    z-index: 9999;
}

/* Contenitore chatbot */
#chat-container {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 320px;
    background: white;
    border-radius: 15px;
    padding: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    display: none;
    z-index: 10000;
    font-size: 13px; /* Caratteri più piccoli */
}

/* Header chat */
#chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #0d6efd; /* Colore aggiornato */
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
}

#close-chat {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
}

/* Chat log */
#chat-log {
    height: 250px;
    overflow-y: auto;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

/* Input e pulsante */
#chat-input-container {
    display: flex;
    padding: 10px;
    align-items: center;
}

#chat-input {
    flex: 1;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 25px;
    outline: none;
    font-size: 13px;
}

/* Pulsante di invio con angoli arrotondati e più largo */
#send-button {
    background: #0d6efd; /* Colore del footer */
    color: white;
    border: none;
    padding: 12px 20px; /* Più largo */
    border-radius: 25px; /* Angoli più smussati */
    cursor: pointer;
    font-size: 18px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease-in-out;
}

#send-button:hover {
    background: #094ab2; /* Versione più scura per effetto hover */
}

/* Stile messaggi */
.user-message, .bot-message {
    padding: 10px;
    margin: 5px 0;
    border-radius: 15px;
    max-width: 80%;
}

.user-message {
    background: #0d6efd;
    color: white;
    align-self: flex-end;
    text-align: right;
}

.bot-message {
    background: #f1f1f1;
    align-self: flex-start;
}

</style>
