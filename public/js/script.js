var socket = io();
var gameId = document.getElementById("gameId").innerHTML;
var socketId;
var highFiving = false;

socket.on("start", function() {
  start();
})

socket.emit("init", gameId);
socket.on("init", function(data) {
  socketId = data.id;
  console.log(data.number);
  if (data.number >= 2) {
    socket.emit("start");
    start();
  }
});

socket.on("quit", function() {
  console.log("AWDIOWFNIU00");
  running = false;
  document.getElementById("status").innerHTML = "Waiting for player to join...";
});

function start() {
  document.getElementById("status").innerHTML = "Ready to high five!";
  running = true;
}



var threshhold = 50;
var highFived = false;
var running = false;

var max = 0;
window.ondevicemotion = function(event){
  if (running) {
    var acce = Math.abs(event.accelerationIncludingGravity.x) + Math.abs(event.accelerationIncludingGravity.y)+ Math.abs(event.accelerationIncludingGravity.z);

    if (acce>max){
      max=acce;
      document.getElementById("acc").innerHTML = max;
    }

    if (max>threshhold && !highFived){
      setTimeout(function() {
        highFived = true;
        document.getElementById("status").innerHTML = "High FIVE! Max value was " + max;
      }, 1000);
    }
  }

//document.getElementById("acc").innerHTML = document.getElementById("acc").innerHTML +"<br>" + x+ " " + y + " " + z;
};
