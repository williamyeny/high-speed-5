var socket = io();
var gameId = document.getElementById("gameId").innerHTML;
var socketId;
var highFiving = false;
socket.emit("init", gameId);
socket.on("init", function(id) {
  socketId = id;
});

var threshhold = 40;

var highFiveMax = 0;
var overAllMax = 0;
window.ondevicemotion = function(event){
  var acce = Math.abs(event.accelerationIncludingGravity.x) + Math.abs(event.accelerationIncludingGravity.y)+ Math.abs(event.accelerationIncludingGravity.z);
  document.getElementById("acc").innerHTML = overAllMax;

if (acce>highFiveMax && !highFiving){
  highFiveMax=acce;
}

if (acce>overAllMax) {
  overAllMax = acce;
}

if (highFiveMax>threshhold){
  highFiving = true;

}
 if (highFiving && acce<threshhold){
   document.getElementById("status").innerHTML = "High FIVE! Max value was " + highFiveMax;
 }

//document.getElementById("acc").innerHTML = document.getElementById("acc").innerHTML +"<br>" + x+ " " + y + " " + z;
}
