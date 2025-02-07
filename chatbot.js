document.addEventListener("DOMContentLoaded", function() {
    const chatWidget = document.createElement("div");
    chatWidget.innerHTML = `
        <div id="chat-container" style="position: fixed; bottom: 20px; right: 20px; width: 300px; background: white; border-radius: 10px; padding: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);">
            <div id="chat-box">
                <div id="chat-log" style="height: 250px; overflow-y: auto; border-bottom: 1px solid #ccc; margin-bottom: 10px;"></div>
                <input type="text" id="chat-input" placeholder="Scrivi un messaggio..." style="width: calc(100% - 60px); padding: 5px;">
                <button id="send-button" style="width: 50px;">Invia</button>
            </div>
        </div>
    `;
    document.body.appendChild(chatWidget);

    document.getElementById("send-button").addEventListener("click", async function() {
        const input = document.getElementById("chat-input");
        const chatLog = document.getElementById("chat-log");

        const userMessage = input.value.trim();
        if (!userMessage) return;

        chatLog.innerHTML += `<div><b>Tu:</b> ${userMessage}</div>`;
        input.value = "";

        const response = await fetch("https://carla-backend.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        chatLog.innerHTML += `<div><b>Carla:</b> ${data.reply}</div>`;
        chatLog.scrollTop = chatLog.scrollHeight;
    });
});
