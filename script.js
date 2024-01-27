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

function getPlayerChoice() {
    // Prompt user for 3 possible choices (rock, paper or scissors)
    // Continue to prompt if choice not in dictionary (invalid choice)
    let playerChoice;
    for (let i = 0; !(playerChoice in winnerLoserDict); i++) {
        if (i > 0) {
            console.log("Invalid choice!");
        }
        playerChoice = prompt("Rock, Paper or Scissors?");

        // Randomly assign player choice if option is null
        if (playerChoice === null) {
            playerChoice = getComputerChoice();
        }
    
        return playerChoice.toLowerCase();
    }
}

function playRound(playerSelection, computerSelection) {
    // Compare playerSelection to computerSelection
    console.log(`Player: ${playerSelection} | Computer: ${computerSelection}`);

    if (playerSelection == computerSelection) {
        return "tie";
    }

    // Check if computer choice matches the key value of playerSelection (key beats value)
    if (computerSelection == winnerLoserDict[playerSelection]) {
        return "win";
    }
    return "lose"
}

function game() {
    let result;
    let playerScore = 0;
    let computerScore = 0;
    
    // Replay rounds until a player reaches a score of 5
    while (playerScore < 5 && computerScore < 5) {
        result = playRound(getPlayerChoice(), getComputerChoice());
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
        console.log(`Player Score: ${playerScore} | Computer Score: ${computerScore}`);
    }

    if (playerScore > computerScore) {
        return "YOU WIN!";
    } else {
        return "YOU LOSE!";
    }
}
