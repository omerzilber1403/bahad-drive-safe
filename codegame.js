var savedAnswer;
$(function () {
  init();
  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);
  $("button").on("click", function (event) {
    if (event.currentTarget.id === "button2") {
      window.location.assign("game.html");
    } else {
      window.location.assign("index.html");
    }
  });

  $(".answer").on("click", function (event) {
    if ($(this).attr("id").charAt(6) === quiz[rndNum].correctAnswer) {
      console.log("hi");
      $(this).css("background-color", "green");
      savedAnswer = $(this);
      setTimeout(function () {
        $("#quiz").fadeOut();
        savedAnswer.css("background-color", "rgba(0, 0, 139, 0.2)");
        policemanFrames = 0;
        policeman.y = -170;
        (road1.speed = screen.height / 70), counterQues++;
        if (counterQues === 2) {
          $("#message_text").text("הגעת ליעד בהצלחה!!");
          $("#message").css("background-color", "green");
          cancelAnimationFrame(req);
          $("#message").fadeIn();
        } else {
          startAnimating(50);
        }
      }, 500);
    } else {
      $(this).css("background-color", "red");
      setTimeout(function () {
        $("#quiz").fadeOut();
        $("#message").fadeIn();
        $(this).css("background-color", "rgba(0, 0, 139, 0.2)");
      }, 500);
    }
  });
});

quiz = [
  {
    question: "מה זה מרחק עצירה?",
    answers: [
      "מרחק הכולל שרכב עובר מהרגע שבו הנהג או הנהגת הבחינו בצורך לעצור ועד לעצירתו המוחלטת של הרכב.",
      "המרחק שלוקח לרכב לעצור מהרגע שהנהג לוחץ על הדוושה עד לעצירה הוחלטת",
      "המרחק של הרכב מהשוליים בכל רגע נתון",
      "המרחק שלוקח לעובר אורח לחצות במעבר החציה עד שהרמזור מתחלף לאדום",
    ],
    correctAnswer: "1",
  },
  {
    question:
      "נהגתם שעות מרובות על הכביש בלילה ואתם מרגישים שהעיניים שלכם נעצמות לאט לאט. מה עליכם לעשות?",
    answers: [
      "לעצור לשתות קפה ולהמשיך בנסיעה.",
      "להגביר את הרדיו ולהישאר מפוקסים.",
      "לעצור בצד הדרך במקום בטיחותי, לתפוס תנומה קלה, ורק כאשר מרגישים עירניים להמשיך בנסיעה.",
      "אם היעד קרוב להמשיך לנסוע, ואם לא לעצור לתנומה קלה.",
    ],
    correctAnswer: "3",
  }
];
var finishQuizes = [];
var counterQues = 0;
player = {
  x: screen.width / 3,
  y: screen.height / 1.7,
  width: 129,
  height: 194,
  frameX: 0,
  frameY: 0,
  speed: screen.width / 3,
  moving: false,
  position: 1,
};

// [left,right]
moving = [false, false];

const playerSprite = new Image();
playerSprite.src = "images/car_up.png";
const background = new Image();
background.src = "images/road.png";

var pirate = new Image();
pirate.src = "images/pirate1.png";
var pirate_img2 = new Image();
pirate_img2.src = "images/pirate3.png";

var policemanImg = new Image();
policemanImg.src = "images/policeman.png";

pirate1 = {
  src: "images/pirate1.png",
  x: screen.width / 2.3,
  y: -screen.height / 8,
  width: 58.75,
  height: 88.25,
  frameX: 0,
  frameY: 0,
  speed: screen.width / 50,
  position: 1,
};

pirate2 = {
  src: "images/pirate1.png",
  x: screen.width / 2.3,
  y: -screen.height * 2,
  width: 58.75,
  height: 88.25,
  frameX: 0,
  frameY: 0,
  speed: screen.width / 50,
  position: 1,
};

road1 = {
  y: 0,
  speed: screen.height / 70,
};

road2 = {
  y: -screen.height,
};

policeman = {
  src: "images/pirate1.png",
  x: screen.width / 3,
  y: -170,
  width: 142,
  height: 170,
  frameX: 0,
  frameY: 0,
  speed: screen.width / 70,
  position: 1,
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

function movepirate1() {
  pirate1.y += pirate1.speed;
  if (pirate1.y > screen.height) {
    pirate1.y = -screen.height / 8;
    pirate1.position = Math.round(Math.random() * 3);
    pirate.src = "images/pirate" + (Math.round(Math.random() * 3) + 1) + ".png";
    if (pirate1.position === 0) {
      pirate1.x = screen.width / 2.3 - screen.width / 3;
    } else if (pirate1.position === 1) {
      pirate1.x = screen.width / 2.3;
    } else {
      pirate1.x = screen.width / 2.3 + screen.width / 3;
    }
  }
  handlePirateFrame(1);
}

function movepirate2() {
  pirate2.y += pirate2.speed;
  if (pirate2.y > screen.height) {
    pirate2.y = -screen.height * Math.random() * 2;
    pirate2.position = Math.round(Math.random() * 3);
    pirate_img2.src =
      "images/pirate" + (Math.round(Math.random() * 3) + 1) + ".png";
    if (pirate2.position === 0) {
      pirate2.x = screen.width / 2.3 - screen.width / 3;
    } else if (pirate2.position === 1) {
      pirate2.x = screen.width / 2.3;
    } else {
      pirate2.x = screen.width / 2.3 + screen.width / 3;
    }
  }
  handlePirateFrame(2);
}

let counterFrames = 0;
function handlePirateFrame(num) {
  if (counterFrames === 5) {
    if (eval("pirate" + num + ".frameX") < 3) {
      eval("pirate" + num + ".frameX++");
    } else {
      eval("pirate" + num + ".frameX = 0");
    }
    counterFrames = 0;
  }

  counterFrames++;
}

var req;
function handleAccidents() {
  if (
    (player.y + player.height / 2 >= pirate1.y &&
      pirate1.y >= player.y - player.height / 2.5 &&
      pirate1.position === player.position) ||
    (player.y + player.height / 2 >= pirate2.y &&
      pirate2.y >= player.y - player.height / 2.5 &&
      pirate2.position === player.position)
  ) {
    cancelAnimationFrame(req);
    $("#message").fadeIn();
    $("#message").css("display", "flex");
  }
}

var rndNum;
function policemanArrive() {
  pirate2.y = -screen.height / 8;
  pirate1.y = -screen.height / 8;
  policeman.y += road1.speed;
  road1.speed -= road1.speed / 20;
  road2.speed = road1.speed;
  if (road2.speed < 0.5) {
    cancelAnimationFrame(req);
    console.log("in");
    chooseRandomNumber(2);
    console.log(rndNum);
    $("#question").text(quiz[rndNum].question);
    for (var i = 0; i < 4; i++) {
      $("#answer" + (i + 1)).text(quiz[rndNum].answers[i]);
    }
    $("#quiz").fadeIn();
    $("#quiz").css("display", "flex");
  }
}

function chooseRandomNumber(questionAmount) {
  numb = Math.round(Math.random() * (questionAmount - 1));
  if (!finishQuizes.includes(numb)) {
    finishQuizes.push(numb);
    console.log(numb);
    rndNum = numb;
  }
  else {
    chooseRandomNumber(questionAmount);
  }
}

let fps, fpsInterval, startTime, now, then, elapsed;
function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

let policemanFrames = 0;
function animate() {
  req = requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, road1.y, screen.width, screen.height);
    ctx.drawImage(background, 0, road2.y, screen.width, screen.height);
    drawSprite(
      pirate,
      pirate1.width * pirate1.frameX,
      pirate1.height * pirate1.frameY,
      pirate1.width,
      pirate1.height,
      pirate1.x,
      pirate1.y,
      pirate1.width,
      pirate1.height
    );
    drawSprite(
      pirate_img2,
      pirate2.width * pirate2.frameX,
      pirate2.height * pirate2.frameY,
      pirate2.width,
      pirate2.height,
      pirate2.x,
      pirate2.y,
      pirate2.width,
      pirate2.height
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
    drawSprite(
      policemanImg,
      0,
      0,
      policeman.width,
      policeman.height,
      policeman.x,
      policeman.y,
      policeman.width,
      policeman.height
    );

    movePlayer();
    moveRoad();
    if (policemanFrames < 100) {
      movepirate1();
      movepirate2();
    } else {
      policemanArrive();
    }
    handleAccidents();
    policemanFrames++;
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
      moving[0] = true;
    } else {
      /* right swipe */
      moving[1] = true;
    }
  } else {
    if (yDiff > 0) {
      /* up swipe */
    } else {
      /* down swipe */
s    }
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
    pirate1.width * pirate1.frameX,
    pirate1.height * pirate1.frameY,
    pirate1.width,
    pirate1.height,
    pirate1.x,
    pirate1.y,
    pirate1.width,
    pirate1.height
  );

  movePlayer();
  moveRoad();
  movepirate1();
  requestAnimationFrame(animate);
}*/
