//declare variables
let canvas,
  ctx,
  ballX,
  ballY,
  ballRadius,
  ballDX,
  ballDY,
  batHeight,
  batWidth,
  batX,
  score;
let playing = false;
function init() {
  // Get the canvas element and context
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");

  // Set the initial positions of the ball and bat
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
  ballRadius = 10;
  ballDX = 2;
  ballDY = -2;

  batHeight = 10;
  batWidth = 75;
  batX = (canvas.width - batWidth) / 2;
  // Keep track of the score
  score = 0;
  draw();
}

// Draw the ball, bat, and score
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

  // Draw the bat
  ctx.beginPath();
  ctx.rect(batX, canvas.height - batHeight, batWidth, batHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

  // Draw the score
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Move the ball and check for collisions
function move() {
  if (playing) {
    // Move the ball
    ballX += ballDX;
    ballY += ballDY;

    // Check for collisions with the walls
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
      ballDX = -ballDX;
    }
    if (ballY - ballRadius < 0) {
      ballDY = -ballDY;
    } else if (ballY + ballRadius > canvas.height) {
      // Check for collision with the bat
      if (ballX > batX && ballX < batX + batWidth) {
        ballDY = -ballDY;
        score++;
      } else {
        swal(`Game Over! Your score is ${score}.`);
        playing = false;
      }
    }
  }
  draw();
}

// Main game loop
function game() {
  move();
  draw();
}
init();

// Start the game loop
const interval = setInterval(game, 16.67); 

// Add mouse event listeners to move the bat
canvas.addEventListener("mousemove", moveBat);

function moveBat(event) {
  const relativeX = event.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width && playing) {
    batX = relativeX - batWidth / 2;
  }
}
// Add mouse event listeners to start game
function start() {
  playing = true;
}
canvas.addEventListener("click", start);

// Add mouse event listeners to stop and resume game
function stopResume() {
  if (playing) {
    playing = false;
    document.querySelector(".stop_button").innerText = "Resume";
   
  } else {
    playing = true;
    document.querySelector(".stop_button").innerText = "Stop";
  }
}
canvas.addEventListener("click", stopResume);
