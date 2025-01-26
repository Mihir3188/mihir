var playing = false;
var score = 0;
var action;
var timeremaining;
var correctAnswer;

// If we click on the start/reset
document.getElementById("startreset").onclick = function() {
    // If we are playing
    if (playing == true) {
        resetGame(); // Reset the game
    } else { // If we are not playing
        // Change mode to playing
        playing = true;
        // Set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        // Show countdown box
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        // Hide game over box
        hide("gameover");
        // Change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        // Start countdown
        startCountdown();
        // Generate a new Q&A
        generateQA();
    }
}

// Clicking on an answer box
for (var i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function() {
        // Check if we are playing
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                // Correct answer
                // Increase score by 1
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                // Hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function() {
                    hide("correct");
                }, 1000);
                // Generate new Q&A
                generateQA();
            } else {
                // Wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function() {
                    hide("wrong");
                }, 1000);
            }
        }
    };
}

// Start counter
function startCountdown() {
    action = setInterval(function() {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) { // Game over
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

// Stop counter
function stopCountdown() {
    clearInterval(action);
}

// Reset game
function resetGame() {
    stopCountdown(); // Stop the countdown
    show("gameover"); // Show the game over message
    document.getElementById("gameover").innerHTML = "<p>Your final score is " + score + ".</p>";
    hide("timeremaining"); // Hide the countdown
    hide("correct"); // Hide the correct message
    hide("wrong"); // Hide the wrong message
    playing = false; // Set playing to false
    document.getElementById("startreset").innerHTML = "Start Game"; // Change button text
}

// Hide an element
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

// Show an element
function show(Id) {
    document.getElementById(Id).style.display = "block";
}

// Generate question and multiple answers
function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    console.log("Question: " + x + " x " + y); // Debugging
    console.log("Correct Answer: " + correctAnswer); // Debugging
    document.getElementById("question").innerHTML = x + " x " + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; // Fill one box with the correct answer

    // Fill other boxes with wrong answers
    var answers = [correctAnswer];
    for (var i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())); // A wrong answer
            } while (answers.indexOf(wrongAnswer) > -1);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
            console.log("Wrong Answer for box" + i + ": " + wrongAnswer); // Debugging
        }
    }
}
