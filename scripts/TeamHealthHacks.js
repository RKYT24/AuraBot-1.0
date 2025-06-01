const spanElement = document.getElementById("Team");

        spanElement.addEventListener("mouseover", () => {
            spanElement.textContent = "Rahul Kumar, Rahul Thapa, Shubham";
        });

        spanElement.addEventListener("mouseout", () => {
            spanElement.textContent = "Team HealthHacks";
        });