const API_KEY = process.env.API_KEY;

document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        addMessageToChat("user", userMessage);
        userInput.value = "";
        addTypingIndicator();

        sendMessageToAI(userMessage);
    }

    async function sendMessageToAI(userMessage) {.
        try {
            if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY") {
                console.warn("API key is missing or invalid.");
                addMessageToChat('ai', "I'm unable to respond right now. Please check API key.");
                return;
            }

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: userMessage }
                            ]
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = data.candidates[0].content.parts[0].text || "I'm sorry, I couldn't process that.";

            removeTypingIndicator();
            addMessageToChat('ai', aiMessage);
        } catch (error) {
            console.error("Error communicating with AI:", error);
            removeTypingIndicator();
            addMessageToChat('ai', "I'm sorry, I'm having trouble connecting right now. Please try again later.");
        }
    }

    function addMessageToChat(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = message;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function addTypingIndicator() {
        const typingIndicator = document.createElement("div");
        typingIndicator.id = "typing-indicator";
        typingIndicator.classList.add("message", "ai");
        typingIndicator.textContent = "Typing...";
        chatContainer.appendChild(typingIndicator);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById("typing-indicator");
        if (typingIndicator) typingIndicator.remove();
    }
});
