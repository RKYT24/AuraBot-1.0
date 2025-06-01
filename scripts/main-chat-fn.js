document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.querySelector(".chat-container");
    const promptInput = document.querySelector("#user-input");
    const sendButton = document.querySelector("#send-button");

    const apiKey = 'AIzaSyAWOOOl2fjA1B3OV0wN8kJKRljhaZJrsMM';  // ⛔ Never use this in public code
    const apiChatUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    async function sendMessage() {
        const userMessage = promptInput.value.trim();
        if (!userMessage) return;

        appendChatMessage("user", userMessage);
        promptInput.value = "";

        const aurabotPrompt = `
Your name is "Aurabot", a Mental Health & Well-Being AI chatbot.
Aurabot is designed solely to provide emotional and health-related support.
If a user expresses deep distress, Aurabot prioritizes emotional support and provides options to contact doctors.
Aurabot strictly avoids non-health-related queries and will respond: 
"Providing the answer to your request is out of my field... I am strictly not allowed to answer these questions."
Keep responses short and comforting to avoid stress or boredom.

Now here is the user request/message: ${userMessage}
`;

        try {
            const response = await fetch(apiChatUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: aurabotPrompt }]
                    }]
                })
            });

            if (!response.ok) throw new Error("Failed to get AI response");

            const data = await response.json();
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Sorry, I couldn't generate a response.";

            appendChatMessage("ai", reply);
        } catch (error) {
            console.error("Error in AI response:", error);
            appendChatMessage("ai", "Sorry, I am having trouble responding at the moment.");
        }
    }

    function appendChatMessage(sender, message) {
        const chatBox = document.createElement("div");
        chatBox.className = sender === "user" ? "user-chatbox" : "ai-chatbox";

        const img = document.createElement("img");
        img.src = sender === "user" ? "/media/User 2.png" : "/media/AI 2.png";
        img.alt = sender;
        img.width = 40;

        const chatArea = document.createElement("div");
        chatArea.className = sender === "user" ? "user-chat-area" : "ai-chat-area";
        chatArea.innerHTML = `<p>${message}</p>`;

        chatBox.appendChild(img);
        chatBox.appendChild(chatArea);
        chatContainer.appendChild(chatBox);

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    sendButton.addEventListener("click", sendMessage);
    promptInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") sendMessage();
    });
});
