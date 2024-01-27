
// Create dictionary that determines winning choices (key beats value)
const winnerLoserDict = {rock: "scissors", scissors: "paper", paper: "rock"};
getComputerChoice();

function getComputerChoice() {
    // Randomly returns either "rock", "paper" or "scissors"

    // Get random number between 1 and 3
    let randomNum = Math.floor(Math.random() * 3) + 1;
    
    // Loop through winnerLoserDict keys and keep track of an index
    // Return key ("rock", "paper" or "scissors") when index is equal to randomNum
    let index = 1
    for (key in winnerLoserDict) {
        if (index == randomNum) {
            return key;
        }
        index++;
    }
}

function getPlayerChoice() {
    // Prompt user for 3 possible choices (rock, paper or scissors)
    // Convert choice to lowercase
    // Prompt again if choice is invalid
}

function playRound(playerSelection, computerSelection) {
    // Compare playerSelection to computerSelection

    // if playerSelection is the same as computerSelection
        // return "tie"

    // if playerSelection is rock
        // if computerSelection is scissors
            // return "win"
        // else return "lose"

    // if playerSelection is scissors
        // if computerSelection is paper
            // return "win"
        // else return "lose"

    // if playerSelection is paper
        // if computerSelection is rock
            // return "win"
        // else return "lose"
}

function game() {
    // Loop playRound 5 times
    // Use counters to track player scores
    // Return winner with highest score when loop terminates
}
