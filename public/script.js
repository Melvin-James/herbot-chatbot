document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");

    window.sendMessage = async function() {
        const message = userInput.value.trim();
        if (message === "") return;

        // Add user message to chat
        chatBox.innerHTML += `<div class="message user-message"><strong>You:</strong> ${message}</div>`;
        userInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;

        // Send user input to backend
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        // Add bot response to chat
        chatBox.innerHTML += `<div class="message bot-message"><strong>HerBot:</strong> ${data.reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    // Send message when Enter is pressed
    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});