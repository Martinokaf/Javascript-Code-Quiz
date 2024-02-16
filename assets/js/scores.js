let highscoresBoard = document.getElementById("highscores");
let clear = document.getElementById("clear");

let allScores = [];

renderScores();

function renderScores() {
    // Pulls all info from local storage
    let storedScores = Object.entries(localStorage);

    if (storedScores.length > 0) {
        allScores = storedScores;
    } else {
        highscoresBoard.textContent = "No highscores!";
    }

    getScores();
}

function getScores() {
    // Creates list items with scores pulled from local storage
    highscoresBoard.innerHTML = "";

    for (let i = 0; i < allScores.length; i++) {
        let [initials, score] = allScores[i];
        let li = document.createElement("li");
        li.textContent = `${initials}: ${score}`;
        highscoresBoard.appendChild(li);
    }
}

clear.addEventListener("click", () => {
    // Clears the local storage and deletes the scores
    localStorage.clear();
    highscoresBoard.textContent = "No highscores!";
});
