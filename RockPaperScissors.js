
let userScore = 0;
let compScore = 0;
let round = 0;

const choices = document.querySelectorAll(".choice");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#computer-score");
const msg = document.querySelector("#msg");
const roundInfo = document.querySelector("#round-info");
const resetBtn = document.querySelector("#reset-btn");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * options.length);
    return options[randIdx];
};

const animateScore = (element) => {
    element.classList.remove("pop");
    void element.offsetWidth;
    element.classList.add("pop");
};

const showResult = (text, resultClass) => {
    msg.textContent = text;
    msg.classList.remove("win", "lose", "draw");
    msg.classList.add(resultClass);
};

const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    round++;

    if (userChoice === compChoice) {
        showResult("🤝 It's a Draw!", "draw");
        roundInfo.textContent =
            `Round ${round}: Both chose ${userChoice}.`;
        return;
    }

    const userWin =
        (userChoice === "rock" && compChoice === "scissors") ||
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissors" && compChoice === "paper");

    if (userWin) {
        userScore++;
        userScorePara.textContent = userScore;
        animateScore(userScorePara);

        showResult("🎉 You Win This Round!", "win");
        roundInfo.textContent =
            `Your ${userChoice} beats computer's ${compChoice}!`;
    } else {
        compScore++;
        compScorePara.textContent = compScore;
        animateScore(compScorePara);

        showResult("🤖 Computer Wins!", "lose");
        roundInfo.textContent =
            `Computer's ${compChoice} beats your ${userChoice}.`;
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        playGame(choice.id);
    });
});

resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    round = 0;

    userScorePara.textContent = "0";
    compScorePara.textContent = "0";

    userScorePara.classList.remove("pop");
    compScorePara.classList.remove("pop");

    showResult("🎮 Play Your Move", "");
    roundInfo.textContent = "First to play, first to win!";
});
