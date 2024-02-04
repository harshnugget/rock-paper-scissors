// Add event listener to div containing choice buttons
// Track which button is clicked and save as choice
let playerChoice;

document.querySelector("#choices").addEventListener("click", function(event) {
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

function getComputerChoice() {
    // Randomly returns either "rock", "paper" or "scissors"
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

function playRound(playerSelection, computerSelection) {
    // Compare playerSelection to computerSelection
    console.log(`Player: ${playerSelection} | Computer: ${computerSelection}`);

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

    // Replay rounds until a player reaches a score of 5
    if (!(playerChoice)) {
        console.log("No choice selected");
        return;
    };
    result = playRound(playerChoice, getComputerChoice());
    switch (result) {
        case "win":
            console.log("You won this round!");
            playerScore++;
            break;
        case "lose":
            console.log("You lose this round!");
            computerScore++;
            break;
        case "tie":
            console.log("It's a tie this round!");
    }
    playerChoice = "";  // Reset player choice after every round
    console.log(`Player Score: ${playerScore} | Computer Score: ${computerScore}\n\n`);

    if (playerScore == 5) {
        playerScore = 0;
        computerScore = 0;
        
        return "YOU WIN!\n\n";
    } 
    if (computerScore == 5) {
        playerScore = 0;
        computerScore = 0;
        return "YOU LOSE!\n\n";
    }
}
