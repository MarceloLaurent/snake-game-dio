let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let counter = document.querySelector(".counter");
let box = 32;
let snake = [];
let score = 0;

snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function drawBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function drawSnake() {
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function  drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update);

function update (event) {
    if(event.keyCode == 37 && direction != "right" && 0 <= snake[0].y && snake[0].y <= 15 * box) direction = "left";
    if(event.keyCode == 38 && direction != "down" && 0 <= snake[0].x && snake[0].x <= 15 * box) direction = "up";
    if(event.keyCode == 39 && direction != "left" && 0 <= snake[0].y && snake[0].y <= 15 * box) direction = "right";
    if(event.keyCode == 40 && direction != "up" && 0 <= snake[0].x && snake[0].x <= 15 * box) direction = "down";
}

function iniciarJogo(){
    counter.innerHTML = score;

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert(`Game Over :( \nSua pontuação é: ${score}!`);
        }
    }
    
    drawBG();
    drawSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "left") snakeX -= box;
    if(direction == "right") snakeX += box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box,
        counter.innerHTML = ++score;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);