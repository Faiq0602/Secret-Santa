document.addEventListener("DOMContentLoaded", function() {
    const participantInput = document.getElementById("participant");
    const addParticipantButton = document.getElementById("addParticipant");
    const removeParticipantButton = document.getElementById("removeParticipant");
    const participantList = document.getElementById("participantList");
    const generateButton = document.getElementById("generateButton");
    const results = document.getElementById("results");

    let nocount = 1
    addParticipantButton.addEventListener("click", function() {
        const participantName = participantInput.value.trim();
        if (participantName !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = "Participant "+ nocount + " : " + participantName;
            participantList.appendChild(listItem);
            participantInput.value = "";
            nocount++;
        }
    });

    removeParticipantButton.addEventListener("click", function() {
        const selectedParticipant = participantList.querySelector("li:last-child");
        if (selectedParticipant) {
            participantList.removeChild(selectedParticipant);
        }
    });

    generateButton.addEventListener("click", function() {
        const participants = Array.from(participantList.children).map(li => li.textContent);
        if (participants.length < 2) {
            alert("Please add at least two participants.");
            return;
        }
        const shuffledParticipants = shuffle(participants);
        const pairings = generatePairings(participants, shuffledParticipants);
        displayResults(pairings);
    });

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function generatePairings(participants, shuffledParticipants) {
        const pairings = [];
        for (let i = 0; i < participants.length; i++) {
            const gifter = participants[i];
            const receiver = shuffledParticipants[(i + 1) % participants.length];
            pairings.push({ gifter, receiver });
        }
        return pairings;
    }

    function displayResults(pairings) {
        results.innerHTML = "<h2>Secret Santa Pairings</h2>";
        const list = document.createElement("ul");
        pairings.forEach(pair => {
            const listItem = document.createElement("li");
            listItem.textContent = `${pair.gifter} ➔ ${pair.receiver}`;
            list.appendChild(listItem);
        });
        results.appendChild(list);
    }
});
