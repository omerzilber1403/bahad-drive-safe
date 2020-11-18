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
        if (counterQues === 10) {
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
      "לעצור במקום בטיחותי, לתפוס תנומה קלה, ורק כאשר מרגישים עירניים להמשיך בנסיעה.",
      "אם היעד קרוב להמשיך לנסוע, ואם לא לעצור לתנומה קלה.",
    ],
    correctAnswer: "3",
  },
  {
    question: "שתית רק חצי ליטר בירה האם מותר לך לעלות על ההגה מיד לאחר מכן?",
    answers: [
      "ברור משום שמשקלי מעל 80 קילוגרם",
      "אסור לשתות בכלל.",
      "מותר אם אתה מרגיש טוב ומפוכח.",
      "מותר כל עוד תצליח לעבור בדיקת ישנוף.",
    ],
    correctAnswer: "2",
  },
  {
    question: ":הינכם רוכבי אופנוע, סמנו את התשובה הנכונה",
    answers: [
      "ניתן להיכנס עם אופנוע לבסיס בלי בעיה.",
      "ניתן לעבוד עם אופנוע במהלך השירות.",
      "אופנוע הינו כלי מסוכן, אך אין בחיל הים נהלים שנוגעים לעולם הדו גלגלי.",
      "כל רוכב אופנוע בבסיס מחוייב בשיחת דו גלגלי עם רסן.",
    ],
    correctAnswer: "4",
  },
  {
    question: "בנסיע על קורקינט/ אופניים חשמליים, מותר לנסוע:",
    answers: [
      "רק על המדרכה",
      "רק על הכביש",
      "בנתיב מיוחד שהוקצה לתנועת אופניים וסומן בתמרור, ובאין שביל אופניים – בכביש",
      "בנתיב תחבורה ציבורית, ובאין- בכביש ",
    ],
    correctAnswer: "3",
  },
  {
    question: "אילו מבין הבאים נחשבים לנהיגה מוסחת?",
    answers: [
      "מדברים בטלפון הנייד בזמן נהיגה",
      "הודעות טקסט בזמן נהיגה",
      "קריאת מפה / הקלדת הוראות GPS תוך כדי נסיעה",
      "כל התשובות נכונות",
    ],
    correctAnswer: "4",
  },
  {
    question: "נהיגה בנקודה עיוורת של משאית, פירושה:",
    answers: [
      "תקבל קילומטראז' טוב יותר",
      "נהג המשאית לא יכול לראות אותך",
      "אחרים לא יכולים לעבור אותך",
      "אתה נמצא באזור הבטוח",
    ],
    correctAnswer: "2",
  },
  {
    question: 'איזה לקח ניתן להפיק מתאונת הדרכים של טוראי אברהם צבי ריין ז"ל?',
    answers: [
      "אין לנהוג באופנוע במהלך השירות הסדיר",
      "ביצוע עקיפה רק לאחר בדיקה שהנתיב השני פנוי ואין רכבים הבאים מולך.",
      "לא לסמסס בזמן נהיגה",
      "לא לנהוג בלחץ אוויר נמוך בגלגל, בעיקר לא על אופנוע",
    ],
    correctAnswer: "2",
  },
  {
    question: 'מה ניתן ללמוד מתאונת הדרכים של רפי בובליל ועמרי שחר ז"ל',
    answers: [
      "אסור באופן חד משמעי לנהוג בהשפעת אלכוהול ובעייפות",
      "יש לנהוג במהירות המותרת ולנהוג בתוך הנתיב",
      "אסור לנסוע עם יותר נוסעים ממספר המקומות ברכב",
      "אסור לנהוג ללא אורות בשעות הערב",
    ],
    correctAnswer: "1",
  },
  {
    question: "מהו הדבר הכי חשוב בנהיגה בחורף?",
    answers: [
      "להימנע מנהיגה ברכב פרטי, ולהשתמש כמה שיותר בתחבורה ציבורית",
      "לוודא שהחימום ברכב עובד.",
      "סעו לאט ושמרו מרחק כפול בין רכב לרכב.",
      "לנסוע תמיד בנתיב שרחוק מהמדרכה כדי לא להחליק.",
    ],
    correctAnswer: "3",
  },
];
var finishQuizes = [];
var counterQues = 0;
player = {
  x: screen.width / 2.8,
  y: screen.height / 1.7,
  width: 110,
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
playerSprite.src = "images/car_up2.png";
const background = new Image();
background.src = "images/road.png";

var car = new Image();
car.src = "images/car1.png";
var car_img2 = new Image();
car_img2.src = "images/car2.png";

var policemanImg = new Image();
policemanImg.src = "images/policeman.png";

car1 = {
  src: "images/car1.png",
  x: screen.width / 2.7,
  y: -screen.height ,
  swidth: 115,
  sheight: 231,
  width: 100,
  height: 170,
  frameX: 0,
  frameY: 0,
  speed: screen.width / 50,
  position: 1,
};

car2 = {
  src: "images/car2.png",
  x: screen.width / 2.7,
  y: -screen.height * 2,
  swidth: 124,
  sheight: 236,
  width: 100,
  height: 170,
  frameX: 0,
  frameY: 0,
  speed: screen.width / 40,
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
  src: "images/car1.png",
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

var num;
function movecar1() {
  car1.y += car1.speed;
  if (car1.y > screen.height) {
    car1.y = -screen.height;
    car1.position = Math.round(Math.random() * 3);
    num = (Math.round(Math.random() * 3) + 1);
    car.src = "images/car" + num + ".png";
    if (num === 1) {
      car1.swidth = 100;
      car1.sheight = 231;
    }
    else if (num === 2) {
      car1.swidth = 124;
      car1.sheight = 236;
    }
    else if (num === 3) {
      car1.swidth = 116;
      car1.sheight = 232;
    }
    else {
      car1.swidth = 115;
      car1.sheight = 235;
    }
    if (car1.position === 0) {
      car1.x = screen.width / 2.7 - screen.width / 3;
    } else if (car1.position === 1) {
      car1.x = screen.width / 2.7;
    } else {
      car1.x = screen.width / 2.7 + screen.width / 3;
    }
  }
}
var num2, rndSpeed2;
function movecar2() {
  car2.y += car2.speed;
  if (car2.y > screen.height) {
    car2.y = -screen.height * Math.random() * 2;
    car2.position = Math.round(Math.random() * 3);
    num2 = (Math.round(Math.random() * 3) + 1);
    car_img2.src = "images/car" + num2 + ".png";
    if (num2 === 1) {
      car2.swidth = 100;
      car2.sheight = 231;
    }
    else if (num2 === 2) {
      car2.swidth = 124;
      car2.sheight = 236;
    }
    else if (num2 === 3) {
      car2.swidth = 116;
      car2.sheight = 232;
    }
    else {
      car2.swidth = 115;
      car2.sheight = 235;
    }
    if (car2.position === 0) {
      car2.x = screen.width / 2.7 - screen.width / 3;
    } else if (car2.position === 1) {
      car2.x = screen.width / 2.7;
    } else {
      car2.x = screen.width / 2.7 + screen.width / 3;
    }
  }
}


var req;
function handleAccidents() {
  if (
    (player.y + player.height / 1.1 > car1.y &&
      car1.y > player.y - player.height / 1.1&&
      car1.position === player.position) ||
    (player.y + player.height / 1.1 > car2.y &&
      car2.y > player.y - player.height / 1.1 &&
      car2.position === player.position)
  ) {
    cancelAnimationFrame(req);
    $("#message").fadeIn();
    $("#message").css("display", "flex");
  }
}

var rndNum;
function policemanArrive() {
  car2.y = -screen.height;
  car1.y = -screen.height * 1.5;
  policeman.y += road1.speed;
  road1.speed -= road1.speed / 20;
  road2.speed = road1.speed;
  if (road2.speed < 0.5) {
    cancelAnimationFrame(req);
    console.log("in");
    chooseRandomNumber(10);
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
  } else {
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
      car,
      0,
      0,
      car1.swidth,
      car1.sheight,
      car1.x,
      car1.y,
      car1.width,
      car1.height
    );
    drawSprite(
      car_img2,
      0,
      0,
      car2.swidth,
      car2.sheight,
      car2.x,
      car2.y,
      car2.width,
      car2.height
    );
    drawSprite(
      playerSprite,
      0,
      0,
      181,
      366,
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
    if (policemanFrames < 1000) {
      movecar1();
      movecar2();
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
      s;
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
    car,
    car1.width * car1.frameX,
    car1.height * car1.frameY,
    car1.width,
    car1.height,
    car1.x,
    car1.y,
    car1.width,
    car1.height
  );

  movePlayer();
  moveRoad();
  movecar1();
  requestAnimationFrame(animate);
}*/
