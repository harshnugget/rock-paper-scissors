// Add event listener to div containing choice buttons
// Track which button is clicked and save as playerChoice
let playerChoice;
let choicesContainer = document.querySelector("#choices");

choicesContainer.addEventListener("click", function(event) {
    // Check if a choice button was selected
    if (!(event.target.matches("#rock-btn, #scissors-btn, #paper-btn"))) {
        return;
    }
    
    // Reset color of choice buttons to default value
    for (let i = 0; i < choicesContainer.children.length; i++) {
        if (event.target == choicesContainer.children[i])
            continue;
        choicesContainer.children[i].style.backgroundColor = "";
    };

    // Changes choice button color
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
    roundInfoChoices.textContent = `You chose ${playerSelection}. Computer chose ${computerSelection}.`;

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

// Create textual elements for displaying round information / scores
let roundInfoChoices = document.createElement("p");
let roundInfoStatus = document.createElement("p");
let roundInfoScore = document.createElement("p");
document.querySelector("#round-info").appendChild(roundInfoChoices);
document.querySelector("#round-info").appendChild(roundInfoStatus);
document.querySelector("#round-info").appendChild(roundInfoScore);

function game() {
    let result;

    roundInfoStatus.style.display = "inline"

    // Replay rounds until a player reaches a score of 5
    if (!(playerChoice)) {
        roundInfoChoices.textContent = `No choice selected!`;
        console.log("No choice selected");
        return;
    };
    result = playRound(playerChoice, getComputerChoice());
    switch (result) {
        case "win":
            console.log("You won this round!");
            roundInfoStatus.textContent = "You won this round!";
            playerScore++;
            break;
        case "lose":
            console.log("You lose this round!");
            roundInfoStatus.textContent = "You lose this round!";
            computerScore++;
            break;
        case "tie":
            console.log("It's a tie this round!");
            roundInfoStatus.textContent = "It's a tie this round!";
    }
    playerChoice = "";  // Reset player choice after every round
    roundInfoScore.textContent = `Player Score: ${playerScore} | Computer Score: ${computerScore}`;
    console.log(`Player Score: ${playerScore} | Computer Score: ${computerScore}\n\n`);
    
    // Reset the color of choice buttons to default value
    for (let i = 0; i < choicesContainer.children.length; i++) {
        choicesContainer.children[i].style.backgroundColor = "";
    };

    if (playerScore == 5) {
        playerScore = 0;
        computerScore = 0;
        roundInfoStatus.style.display = "none"
        roundInfoScore.textContent = "YOU WIN!";
        return "YOU WIN!\n\n";
    } 
    if (computerScore == 5) {
        playerScore = 0;
        computerScore = 0;
        roundInfoStatus.style.display = "none"
        roundInfoScore.textContent = "YOU LOSE!";
        return "YOU LOSE!\n\n";
    }
}
