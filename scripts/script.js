document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  const API_KEY = process.env.GEMINI_API_KEY // Replace with your real Gemini API key
  const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  // Function to add a message to the chat box
  function addMessageToChat(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
  }

  // Function to send message to Gemini Pro
  async function sendMessageToAI(userMessage) {
    if (!API_KEY || API_KEY === process.env.GEMINI_API_KEY) {
      throw new Error("API key is not set or invalid.");
    }

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: userMessage
            }
          ]
        }
      ]
    };

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return aiResponse || "Sorry, I couldn't understand that.";
  }

  // Function to handle sending message
  async function handleSendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    addMessageToChat("user", userMessage);
    userInput.value = "";

    try {
      const aiResponse = await sendMessageToAI(userMessage);
      addMessageToChat("ai", aiResponse);
    } catch (error) {
      console.error("Error communicating with the API:", error);
      addMessageToChat("ai", "An error occurred. Please try again.");
    }
  }

  // Event listeners
  sendButton.addEventListener("click", handleSendMessage);
  userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  });
});
