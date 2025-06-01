document.addEventListener("DOMContentLoaded", function () {
  const axios = require("axios");
  const quoteElement = document.querySelector(".DemoQuote");
  const apiUrl = "https://api.quotable.io/random"; // Using Quotable API for random quotes

  async function fetchQuote() {
    try {
      // const response = await fetch(apiUrl);
      // if (!response.ok) {
      //     throw new Error("Failed to fetch quote");
      // }
      // const data = await response.json();
      // quoteElement.textContent = data.content;

      let config = {
        method: "get",
        maxBodyLength: 150,
        minBodyLength: 50,
        url: apiUrl,
        headers: { "Content-Type": "application/json" },
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error fetching quote:", error);
      quoteElement.textContent = "Keep pushing forward!"; // Fallback quote
    }
  }

  fetchQuote();
});
