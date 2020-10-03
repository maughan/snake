window.onload = function() {
    // create listener for keypress
    document.addEventListener("keydown", keyPress);
    // set fps
    setInterval(game,1000/15);
}

const canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

// create variables
let playerX, playerY, appleX, appleY, gs, tileCount, xVelocity, yVelocity;
playerX = playerY = 0;
appleX = appleY = 15;
gs = tileCount = 20;
xVelocity = yVelocity = 0;
let trail = [];
let tail = 5;

function game() {
    playerX += xVelocity;
    playerY += yVelocity;

    // allows wrapping the canvas
    if (playerX < 0) {
        playerX = tileCount - 1;
    }
    if (playerX > tileCount - 1) {
        playerX = 0;
    }
    if (playerY < 0) {
        playerY = tileCount - 1;
    }
    if (playerY > tileCount - 1 ) {
        playerY = 0;
    }

    // create canvas background
    ctx.fillStyle='black';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // create snake
    for(let i = 0; i < trail.length; i++){
        ctx.fillStyle='lime';
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        // reset snake if you hit self
        if (trail[i].x===playerX && trail[i].y===playerY){
            tail = 5;
        }
    }
    trail.push({x: playerX, y: playerY});

    while (trail.length > tail){
        trail.shift();
    }

    // add length to snake
    if(appleX === playerX && appleY === playerY){
        tail++;
        appleX=Math.floor(Math.random()*tileCount);
        appleY=Math.floor(Math.random()*tileCount);
    }
    // create apple
    ctx.fillStyle='red';
    ctx.fillRect(appleX * gs, appleY * gs, gs - 2, gs - 2);
}

// listen for directional key keypress
function keyPress(event) {
    switch (event.keyCode) {
        case 37:
            xVelocity=-1; yVelocity=0;
            break;
        case 38:
            xVelocity=0; yVelocity=-1;
            break;
        case 39:
            xVelocity=1; yVelocity=0;
            break;
        case 40:
            xVelocity=0; yVelocity=1;
            break;
    }
}