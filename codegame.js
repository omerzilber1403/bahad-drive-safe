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
};

// [left,right]
moving = [false, false];

//position left = 0, center = 1, right =2,
carPosition = 1;

const playerSprite = new Image();
playerSprite.src = "images/car_up.png";
const background = new Image();
background.src = "images/road.png";
console.log(background);

road1 = {
  y: 0,
  speed: screen.height / 5,
};

road2 = {
  y: -screen.height,
};

function init() {
  canvas = document.getElementById("canvas");
  canvas.setAttribute("width", screen.width);
  canvas.setAttribute("height", screen.height);
  ctx = canvas.getContext("2d");
  animate();
}

function drawSprite(img, sX, Sy, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, Sy, sW, sH, dX, dY, dW, dH);
}

function animate() {
  ctx.clearRect (0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, road1.y, screen.width, screen.height);
  ctx.drawImage(
    background,
    0,
    road2.y,
    screen.width,
    screen.height
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
  requestAnimationFrame(animate);
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

function movePlayer() {
  if (moving[0] && carPosition > 0) {
    player.x -= player.speed;
    moving[0] = false;
    carPosition -= 1;
  } else if (moving[1] && carPosition < 2) {
    player.x += player.speed;
    moving[1] = false;
    carPosition += 1;
  }
}

function moveRoad() {
  road1.y += road1.speed;
  road2.y += road1.speed;
  if (road1.y === screen.height) {
    road1.y = 0;
    road2.y = -screen.height;
  }
}