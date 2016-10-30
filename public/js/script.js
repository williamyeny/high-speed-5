var socket = io();
var gameId = document.getElementById("gameId").innerHTML;
var socketId;

socket.on("start", function() {
  start();
});

socket.on("rematch", function(r) {
  window.location = "/game/" + r;
});

socket.emit("init", gameId);
socket.on("init", function(data) {
  socketId = data.id;
  console.log(data.number);
  if (data.number >= 2) {
    socket.emit("start");
    start();
  }
});

socket.on("done", function(s) {
  if (s == "win") {
    document.getElementById("status").innerHTML = "|| VICTORY ||";
  } else {
    document.getElementById("status").innerHTML = "|| DEFEAT ||";
  }
  document.getElementById("gameId").id = "rematch";
  document.getElementById("rematch").innerHTML = "REMATCH";

  document.getElementById("rematch").onclick = function() {
    socket.emit("rematch", gameId);
  };
});

socket.on("quit", function() {
  running = false;
  document.getElementById("status").innerHTML = "// WAITING FOR OPPONENT //";
});



function start() {
  document.getElementById("status").innerHTML = "// READY TO HIGH FIVE //";
  running = true;
}






var threshhold = 50;
var highFived = false;
var running = false;

var max = 0;
if (window.DeviceMotionEvent) {

  webkitRequestFullscreen();

  window.ondevicemotion = function(event){
    if (running) {
      var acce = Math.abs(event.accelerationIncludingGravity.x) + Math.abs(event.accelerationIncludingGravity.y)+ Math.abs(event.accelerationIncludingGravity.z);
      if (!highFived) {
        document.getElementById("acc").innerHTML = "ACCELERATION: " + (Math.round(10*acce)/10).toFixed(1);
      } else {
        document.getElementById("acc").innerHTML = "ACCELERATION: " + (Math.round(10*max)/10).toFixed(1);
      }
      if (acce>max){
        max=acce;

      }

      if (max>threshhold && !highFived){
        setTimeout(function() {
          highFived = true;
          // document.getElementById("status").innerHTML = "High FIVE! Max value was " + max;

          socket.emit("done", max);
        }, 1000);
      }
    }

  //document.getElementById("acc").innerHTML = document.getElementById("acc").innerHTML +"<br>" + x+ " " + y + " " + z;
  };
} else {

}
