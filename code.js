var canvas;
var canvasWidth;
var ctx;

$(function () {
  $("button").on("click", buttonAction);
  $("#exit").on("click", function () {
    $(".instructions").hide();
  });
});

function buttonAction(event) {
  if (event.currentTarget.id === "start_button") {
    window.location.assign("game.html");
  } else {
    $(".instructions").show();
  }
}
