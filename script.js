// Populate array of choices
const choicesContainer = document.querySelector(".choices-container");
const childElementsWithImg = choicesContainer.querySelectorAll(":scope > div:has(img)");
const choicesArray = [];
for (let i = 0; i < childElementsWithImg.length; i++) {
    choicesArray[i] = childElementsWithImg[i];
}

// Initialize X coordinates of choices [left, middle-front, right, middle-back]
let positions = [-150, 0, 150, 0];

updatePositions();

function updatePositions(direction) {
    if (direction == "right") {
        // Shift all choices one position to the right
        let lastIndex = choicesArray.pop();
        choicesArray.unshift(lastIndex);
        // Enable transition effect
        document.querySelector(".choices-container").classList.add("choices-transition");
    } 
    if (direction == "left") {
        // Shift all choices one position to the left
        let firstIndex = choicesArray.shift();
        choicesArray.push(firstIndex); 
        // Enable transition effect
        document.querySelector(".choices-container").classList.add("choices-transition");
    }
    for (let index = 0; index < choicesArray.length; index++) {
        // Re-position choices
        if (index >= positions.length-1) {
            // Queue choices at position 3#mid-back
            choicesArray[index].style.transform = `translateX(${positions[3]}px)`;
        }
        else {
            let sizeFactor; // Resizes choices depending on their position
            let zIndex; // Stacking order of choices
            switch (index) {
                case 1: // Middle-front
                    sizeFactor = 1.5;
                    zIndex = 3;
                    break;
                case 3: // Middle-back
                    sizeFactor = 0.5;
                    zIndex = 1;
                    break;
                default:    // Left / Right
                    sizeFactor = 1;
                    zIndex = 2;
            }
            choicesArray[index].style.transform = `translateX(${positions[index]}px) scale(${sizeFactor})`;
            choicesArray[index].style.zIndex = `${zIndex}`;
        }
    }
};

// Add event listener to div containing choice buttons
// Track which option is clicked and save as playerChoice
let playerChoice;
let computerChoice;

document.querySelector("#choices").addEventListener("click", function(event) {
    // Check if left or right buttons were selected
    if (event.target.id == "left-button" || event.target.id == "right-button") {
        if (event.target.id == "left-button") {
            updatePositions("left");
        }
        else {
            updatePositions("right");
        }
        return;
    }
    
    // Check which option was selected
    event.composedPath().forEach(element => {
        // Shuffle selected option to middle-front
        let choiceIndex = choicesArray.indexOf(element);
        if (choiceIndex == 0) {
            updatePositions("right");
        }
        else if (choiceIndex == 2) {
            updatePositions("left");
        }
        else {
            return;
        }
    });
});

// Create dictionary that determines win/lose (key beats value)
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

    computerChoice = computerSelection;

    // Check for invalid selections
    if (!(playerSelection in winnerLoserDict)) {
        console.log(`Error: "${playerSelection}" is not a valid option.`);
        return;
    }
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

// Play button event listener
const playButton = document.querySelector("#play-btn");
const leftHand = document.querySelector("#left-hand");
const rightHand = document.querySelector("#right-hand");

playButton.addEventListener("click", () => {

    // Reset choices and info
    playerChoice = "";
    computerChoice = "";
    document.querySelector("#round-info").style.display = "";

    if (!leftHand.style.animation) {
        leftHand.style.animation = 'leftHandAnimation 0.5s linear 3';
        rightHand.style.animation = 'rightHandAnimation 0.5s linear 3';
        playButton.disabled = true;
    }

    // Wait for animations to finish
    leftHand.addEventListener('animationend', () => {
        leftHand.style.animation = ''; // Reset the animation property
        rightHand.style.animation = '';
        playButton.disabled = false;

        // Change left hand to player choice
        leftHand.getElementsByTagName("img")[0].src = `images/${playerChoice}.svg`;

        // Change right hand to computer choice
        rightHand.getElementsByTagName("img")[0].src = `images/${computerChoice}.svg`;

        // Display round info
        document.querySelector("#round-info").style.display = "flex";

        // Update scores
        console.log(`Player Score: ${playerScore} | Computer Score: ${computerScore}\n\n`);
        document.getElementById("player-score").textContent = `Player Score: ${playerScore}`;
        document.getElementById("computer-score").textContent = `Computer Score: ${computerScore}`;
    });

    // Play the game
    game();

})

// Variables for tracking scores
let playerScore = 0;
let computerScore = 0;

function game() {
    let result;

    if (playerScore == 5 || computerScore == 5) {
        playerScore = 0;
        computerScore = 0;
        document.getElementById("player-score").textContent = `Player Score: ${playerScore}`;
        document.getElementById("computer-score").textContent = `Computer Score: ${computerScore}`;
    }

    // Reset image displays
    leftHand.getElementsByTagName("img")[0].src = "images/rock.svg";
    rightHand.getElementsByTagName("img")[0].src = "images/rock.svg";

    // Set middle-front option to players choices
    switch (choicesArray[1].id) {
        case "rock-container":
            playerChoice = "rock";
            break;
        case "paper-container":
            playerChoice = "paper";
            break;
        case "scissors-container":
            playerChoice = "scissors";
            break;
    }

    // Handle invalid choices
    if (!(playerChoice)) {
        document.querySelector("#round-choices").textContent = `No choice selected!`;
        console.log("No choice selected");
        return;
    };

    // Replay rounds until a score of 5 is reached
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

    // Declare game winner
    if (playerScore == 5 || computerScore == 5) {
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
    document.querySelector("#round-info").style.display = "none";
    leftHand.getElementsByTagName("img")[0].src = "images/rock.svg";
    rightHand.getElementsByTagName("img")[0].src = "images/rock.svg";
    leftHand.style.animation = ''; // Reset the animation property
    rightHand.style.animation = '';
    playButton.disabled = false;
}