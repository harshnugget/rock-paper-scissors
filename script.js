// Add event listener to div containing choice buttons
// Track which option is clicked and save as playerChoice
let playerChoice;

document.querySelector("#choices").addEventListener("click", function(event) {
    // Check if an option was selected
    if (!(event.target.matches("#rock-btn, #scissors-btn, #paper-btn"))) {
        return;
    }
 
    // Reset options to default color values
    for (value of ["rock", "paper", "scissors"]) {
        if (event.target.id == value + "-btn") {
            continue;
        }
        document.getElementById(value + "-btn").style.backgroundColor = "";
    }

    // Changes option color
    // Resets color and playerChoice if clicked again
    if (!(event.target.style.backgroundColor == "")) {
        event.target.style.backgroundColor = "";
        playerChoice = "";
        return;
    }
    event.target.style.backgroundColor = "red";  

    switch (event.target.id) {
        case "rock-btn":
            playerChoice = "rock";    
            break;
        case "paper-btn":
            playerChoice = "paper"; 
            break;
        case "scissors-btn":
            playerChoice = "scissors";  
            break;
    };
});

// Create dictionary that determines winning choices (key beats value)
const winnerLoserDict = {rock: "scissors", scissors: "paper", paper: "rock"};

// Randomly select "rock", "paper" or "scissors" for computer choice
function getComputerChoice() {
    // Get random number between 1 and 3
    let randomNum = Math.floor(Math.random() * 3) + 1;
    
    // Loop through winnerLoserDict keys and keep track of an index
    // Return key ("rock", "paper" or "scissors") when index is equal to randomNum
    let index = 1;
    for (key in winnerLoserDict) {
        if (index == randomNum) {
            return key;
        }
        index++;
    }
}

// Determine a round winner
function playRound(playerSelection, computerSelection) {
    // Display choices
    console.log(`Player: ${playerSelection} | Computer: ${computerSelection}`);
    document.querySelector("#round-choices").textContent = `You chose ${playerSelection}. Computer chose ${computerSelection}.`;

    if (playerSelection == computerSelection) {
        return "tie";
    }

    // Check if computer choice matches the key value of the player choice in winnerLoserDict (key beats value)
    if (computerSelection == winnerLoserDict[playerSelection]) {
        return "win";
    }
    return "lose"
}

// Variables for tracking scores
let playerScore = 0;
let computerScore = 0;

function game() {
    let result;

    // Reset textual displays
    document.querySelector("#round-status").textContent = "";
    document.querySelector("#round-choices").textContent = "";
    document.querySelector(".round-info").style.display = "flex";

    // Replay rounds until a player reaches a score of 5
    if (!(playerChoice)) {
        document.querySelector("#round-choices").textContent = `No choice selected!`;
        console.log("No choice selected");
        return;
    };
    result = playRound(playerChoice, getComputerChoice());
    switch (result) {
        case "win":
            console.log("You won this round!");
            document.querySelector("#round-status").textContent = "You won this round!";
            playerScore++;
            break;
        case "lose":
            console.log("You lose this round!");
            document.querySelector("#round-status").textContent = "You lose this round!";
            computerScore++;
            break;
        case "tie":
            console.log("It's a tie this round!");
            document.querySelector("#round-status").textContent ="It's a tie this round!";
    }
    playerChoice = "";  // Reset player choice after every round
    console.log(`Player Score: ${playerScore} | Computer Score: ${computerScore}\n\n`);
    document.getElementById("player-score").textContent = `Player Score: ${playerScore}`
    document.getElementById("computer-score").textContent = `Computer Score: ${computerScore}`
    document.getElementById(playerChoice + "-btn").style.backgroundColor = "";  // Reset button color

    // Declare game winner
    if (playerScore == 5 || computerScore == 5) {
        playerScore = 0;
        computerScore = 0;
        document.querySelector("#round-status").textContent = "";
        if (playerScore == 5) {
            document.querySelector("#round-status").textContent = "YOU WIN!";
            return "YOU WIN!\n\n";
        } 
        else {
            document.querySelector("#round-status").textContent = "YOU LOSE!";
            return "YOU LOSE!\n\n";
        }
    }
}

// Reset scores, textual displays and colors
function reset() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById("player-score").textContent = `Player Score: ${playerScore}`
    document.getElementById("computer-score").textContent = `Computer Score: ${computerScore}`
    document.querySelector("#round-status").textContent = "";
    document.querySelector("#round-choices").textContent = "";
    document.querySelector(".round-info").style.display = "none";
    if (playerChoice)
        document.getElementById(playerChoice + "-btn").style.backgroundColor = "";  // Reset button color
}