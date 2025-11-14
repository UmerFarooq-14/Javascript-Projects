// Step 1 Element get
let highestScore = document.querySelector(".highest-score");
let score = document.querySelector(".score");
let board = document.querySelector(".board");
let restartBtn = document.querySelector("#restartBtn");
let puaseBtn = document.querySelector("#puasebtn");
let  bgmusic= document.querySelector("#bgmusic");
 
let initialSnakeHead = snakeHeadPosition();
let snake = [initialSnakeHead];
let direction = { x: 0, y: 0 };
let food = foodRandomPosition();
let currentScore = 0;
let hscore = localStorage.getItem("highest-score");
let foodmusic = new Audio('music/food.mp3');
let gameovermusic = new Audio('music/gameover.mp3');
let movemusic = new Audio('music/move.mp3');

bgmusic.loop = true
let isplaying = false;

score.innerHTML = `Score: ${currentScore}`
if (hscore) {
    highestScore.innerHTML = `Highest Score: ${hscore}`
} else {
    highestScore.innerHTML = `Highest Score: 0`
}

function gameoverMusic() {
    gameovermusic.play()
}

function foodRandomPosition() {
    let randomXPosition = Math.floor(Math.random() * 18 + 1);
    let randomYPosition = Math.floor(Math.random() * 18 + 1);
    return {
        x: randomXPosition,
        y: randomYPosition
    }
}

function snakeHeadPosition() {
    let randomXPosition = Math.floor(Math.random() * 18 + 1);
    let randomYPosition = Math.floor(Math.random() * 18 + 1);
    return {
        x: randomXPosition,
        y: randomYPosition
    }
}
function drawElement(position, className) {
    var element = document.createElement("div");
    element.style.gridRowStart = position.y;
    element.style.gridColumnStart = position.x;
    element.classList.add(className)
    board.appendChild(element)
}

function drawGame() {
    board.innerHTML = ""
    drawElement(food, "food");

    for (let i = 0; i < snake.length; i++) {
        let item = snake[i];
        if (i === 0) {
            drawElement(item, "head")
        } else {
            drawElement(item, "tail")
        }
    }
}

function updateScore() {
    currentScore++;
    score.innerHTML = `Score: ${currentScore}`

    if (currentScore > hscore) {
        hscore = currentScore;
        highestScore.innerHTML = `Highest Score: ${hscore}`
    }
}

function moveSnake() {
    let newhead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }
    snake.unshift(newhead);

    let snakehead = snake[0];
    if (snakehead.x === food.x && snakehead.y === food.y) {
        food = foodRandomPosition();
        foodmusic.play()
        updateScore()
    }
    else {
        snake.pop()
    }
    window.addEventListener("keydown", (e) => {
        let key = e.key;
        let newdirection;
        if (key === "ArrowUp") {
            newdirection = { x: 0, y: -1 }
            movemusic.play()
        }
        else if (key === "ArrowDown") {
            newdirection = { x: 0, y: 1 }
            movemusic.play()
        }
        else if (key === "ArrowLeft") {
            newdirection = { x: -1, y: 0 }
            movemusic.play()
        }
        else if (key === "ArrowRight") {
            newdirection = { x: 1, y: 0 }
            movemusic.play()
        }
        if (newdirection) {
            if (newdirection.x != -direction.x || newdirection.y != -direction.y) {
                direction = newdirection
            }
        }
    })
}

function resetGame() {
    Swal.fire({
        title: '💀 Game Over!',
        html: `Your final score: <b>${currentScore}</b>`,
        confirmButtonText: 'Try Again',
        background: 'transparent',
        allowOutsideClick: false,
        customClass: {
            popup: 'neon-alert'
        }
    })

    initialSnakeHead = snakeHeadPosition();
    snake = [initialSnakeHead];
    direction = { x: 0, y: 0 };
    food = foodRandomPosition();
    let currentHighestScore = localStorage.getItem("highest-score");
    if (currentScore > currentHighestScore) {
        localStorage.setItem("highest-score", hscore)
    }
    currentScore = 0;
    score.innerHTML = `Score: ${currentScore}`
}

function checkgameover() {
    let head = snake[0];
    if (head.x < 1 || head.x > 18 || head.y < 1 || head.y > 18) {
        gameoverMusic()
        return resetGame()
    }
    for (let i = 1; i < snake.length; i++) {
        let item = snake[i];
        if (head.x === item.x && head.y === item.y) {
            gameoverMusic()
            return resetGame()
        }
    }
}

restartBtn.addEventListener("click", () => {
    initialSnakeHead = snakeHeadPosition();
    snake = [initialSnakeHead];
    direction = { x: 0, y: 0 };
    food = foodRandomPosition();
    currentScore = 0;
    score.innerHTML = `Score: ${currentScore}`
})

puaseBtn.addEventListener("click", () => {
    if(isplaying === true){
        bgmusic.pause();
        puaseBtn.innerHTML = `▶ Music`
        isplaying = false
    }
    else{
        bgmusic.play();
        puaseBtn.innerHTML = `⏸ Music`
        isplaying = true
    }
})

setInterval(() => {
    drawGame()
    checkgameover()
    moveSnake()
}, 200);