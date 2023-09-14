const snake = document.getElementById("snake");
const food = document.getElementById("food");
// reference to game container element
const gameContainer = document.querySelector(".game-container");

const containerStyle = getComputedStyle(gameContainer);

// width and height of our game container space
const gameWidth = parseInt(containerStyle.width, 10);
const gameHeight = parseInt(containerStyle.height, 10);

const updateInterval = 500;


// initial position of the snake
let snakeX = 0;
let snakeY = 0;

let snakeLength = 0;

let foodX, foodY;

let direction = "right" // initial direction of snake

// array that will contain coordiantes of each chunk of snake's body
let snakeBody = [{ x: 0, y: 0}]; // initialize with starting position

function update() {

    for (let i = 0; i < snakeBody.length; i++){
        // snakeBody[i].x.style.left = snakeX * 20 + "px";
        console.log(snakeBody[i].x, snakeBody[i].y);
    }

    // initial movement on an update
    if (direction === "right") { 
        snakeX += 1;
    }
    else if (direction === "left") {
        snakeX -= 1;
    }
    else if (direction === "up") {
        snakeY -= 1;
    }
    else if (direction === "down") {
        snakeY += 1;
    }

    // when the snake eats food
    if (snakeX === foodX && snakeY === foodY) {
        // food collision!
        snakeLength++;
        // since we ate food we want new food
        generateFood();

        const newSegment = createSnakeSegment(snakeX, snakeY);
        gameContainer.appendChild(newSegment);
        snakeBody.push(newSegment);

        }
    
    /* snake colliding with itself */
    // goes through whole snakeBody array, not including head
    for (let i = 1; i < snakeBody.length; i++) {
        // if head has same coordinates as some other body part
        if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
            //game over logic
        }
    }
    
    // if the snake collides with a border
    if (snakeX < 0 || snakeX >= gameWidth || snakeY < 0 || snakeY >= gameHeight) {
        // game over logic
    }

    // add new head position to snake body
    snakeBody.unshift({ x: snakeX, y: snakeY }); // adds to beginning of array

    // remove tail of the snake to maintain its length
    if (snakeBody.length > snakeLength) {
        snakeBody.pop(); // removes last chunk of snake body
    }

    // if ( snakeBody[0] !== null) {
    //     snakeBody[0].style.left = snakeX * 20 + "px";
    //     snakeBody[0].style.top = snakeY * 20 + "px";
    // }


    // for (let i = 0; i < snakeLength; i++) {
    //     snakeBody[i].style.left = snakeBody[i + 1].style.left;
    //     snakeBody[i].style.top = snakeBody[i + 1].style.top;
    // }

    // snakeBody[snakeLength].style.left = snakeX * 20 + "px";
    // snakeBody[snakeLength].style.top = snakeY * 20 + "px";




    snake.style.left = snakeX * 20 + "px";
    snake.style.top = snakeY * 20 + "px"

    setTimeout(update, updateInterval);
}

function generateFood() {
    
    const minX = 0;
    const minY = 0;

    // 20 is the length and width of 1 block in pixels
    const maxX = gameWidth / 20;
    const maxY = gameWidth / 20;

    let foodOverlap;

    // generates random coordinates for food within the boundaries
    do {
        // generates coords for range of board, may need to be adjusted
        foodX = Math.floor(Math.random() * (gameWidth / 20));
        foodY = Math.floor(Math.random() * (gameHeight / 20));
        
        // some method checks to see if at least 1 element in array satisfies condition, boolean
        foodOverlap = snakeBody.some(segment => segment.x === foodX && segment.y === foodY);
    } while (foodOverlap); // keeps generating food until it doesnt overlap snake

    food.style.left = foodX * 20 + "px"; // assuming each grid cell is 20 px wide
    food.style.top = foodY * 20 + "px";
}

function createSnakeSegment(x, y) {
    const segment = document.createElement("div");
    segment.classList.add("snake-segment");
    segment.style.width = "20px";
    segment.style.height = "20px";
    segment.style.position = "absolute";
    segment.style.left = x * 20 + "px";
    segment.style.top = y * 20 + "px";
    return segment;
}

// let initialSegment = createSnakeSegment(snakeX, snakeY);
// gameContainer.appendChild(initialSegment);
// snakeBody.push(initialSegment);

// listens for when the user presses a key
document.addEventListener("keydown", (event) => {
    // the snake cannot do a 180 deg turn in one keystroke
    if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    }
    else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
    else if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
    else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }
});

console.log(gameHeight);
console.log(gameWidth);

generateFood();

// update function call starts the game
update();