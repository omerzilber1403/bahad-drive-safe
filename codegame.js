$(function () {
  init();
  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);
});

player = {
  x: screen.width / 3,
  y: screen.height / 1.7,
  width: screen.width / 3,
  height: screen.height / 3,
  frameX: 0,
  frameY: 0,
  speed: screen.width / 3,
  moving: false,
  position: 1
};

// [left,right]
moving = [false, false];



const playerSprite = new Image();
playerSprite.src = "images/car_up.png";
const background = new Image();
background.src = "images/road.png";

var pirate = new Image();
pirate.src = "images/pirate1.png";

pirates = {
  src: "images/pirate1.png",
  x: screen.width / 2.3,
  y: -screen.height / 8,
  width: screen.width / 6,
  height: screen.width / 4,
  frameX: 0,
  frameY: 0,
  speed: screen.width / 50,
  position: 1
};

road1 = {
  y: 0,
  speed: screen.height / 70,
};

road2 = {
  y: -screen.height,
};

function init() {
  canvas = document.getElementById("canvas");
  canvas.setAttribute("width", screen.width);
  canvas.setAttribute("height", screen.height);
  ctx = canvas.getContext("2d");
  startAnimating(50);
}

function drawSprite(img, sX, Sy, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, Sy, sW, sH, dX, dY, dW, dH);
}


function movePlayer() {
  if (moving[0] && player.position > 0) {
    player.x -= player.speed;
    moving[0] = false;
    player.position -= 1;
  } else if (moving[1] && player.position < 2) {
    player.x += player.speed;
    moving[1] = false;
    player.position += 1;
  }
}

function moveRoad() {
  road1.y += road1.speed;
  road2.y += road1.speed;
  if (road1.y > screen.height) {
    road1.y = 0;
    road2.y = -screen.height;
  }
}

function movePirates() {
  pirates.y += pirates.speed;
  if (pirates.y > screen.height) {
    pirates.y = -screen.height / 8;
    pirates.position = Math.round(Math.random() * 2);
    pirate.src = "images/pirate" + (Math.round(Math.random() * 3) + 1) + ".png";
    if (pirates.position === 0) {
      pirates.x = screen.width / 2.3 + screen.width/3;
    }
    if (pirates.position === 1) {
      pirates.x = screen.width / 2.3;
    }
    else {
      pirates.x = screen.width / 2.3 - screen.width/3;
    }
  }
  handlePirateFrame();
}

let counterFrames = 0;
function handlePirateFrame() {
  if (counterFrames === 5) {
    if (pirates.frameX < 3) {
      pirates.frameX++;
    } else {
      pirates.frameX = 0;
    }
    counterFrames = 0;
  }
  counterFrames++;
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, road1.y, screen.width, screen.height);
    ctx.drawImage(background, 0, road2.y, screen.width, screen.height);
    drawSprite(
      pirate,
      pirates.width * pirates.frameX,
      pirates.height * pirates.frameY,
      pirates.width,
      pirates.height,
      pirates.x,
      pirates.y,
      pirates.width,
      pirates.height
    );
    drawSprite(
      playerSprite,
      0,
      0,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height
    );
    movePlayer();
    moveRoad();
    movePirates();
  }
}


var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* left swipe */
      console.log("left");
      moving[0] = true;
    } else {
      /* right swipe */
      console.log("right");
      moving[1] = true;
    }
  } else {
    if (yDiff > 0) {
      /* up swipe */
      console.log("up");
    } else {
      /* down swipe */
      console.log("down");
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

/*
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, road1.y, screen.width, screen.height);
  ctx.drawImage(background, 0, road2.y, screen.width, screen.height);
  drawSprite(
    playerSprite,
    0,
    0,
    player.width,
    player.height,
    player.x,
    player.y,
    player.width,
    player.height
  );
  drawSprite(
    pirate,
    pirates.width * pirates.frameX,
    pirates.height * pirates.frameY,
    pirates.width,
    pirates.height,
    pirates.x,
    pirates.y,
    pirates.width,
    pirates.height
  );

  movePlayer();
  moveRoad();
  movePirates();
  requestAnimationFrame(animate);
}*/
