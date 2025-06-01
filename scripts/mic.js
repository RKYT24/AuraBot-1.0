document.addEventListener("DOMContentLoaded", function () {
    const speechButton = document.querySelector(".speech-to-text-btn");
    const promptInput = document.querySelector("#prompt");

    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        console.error("Speech recognition not supported in this browser.");
        return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        promptInput.value = transcript;
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);
    };

    speechButton.addEventListener("click", function () {
        recognition.start();
    });

});
