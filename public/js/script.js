var socket = io();
var gameId = document.getElementById("gameId").innerHTML;
var socketId;
var highFiving = false;
socket.emit("init", gameId);
socket.on("init", function(id) {
  socketId = id;
});

var threshhold = 40;

var max = 0;
window.ondevicemotion = function(event){
  var acce = Math.abs(event.accelerationIncludingGravity.x) + Math.abs(event.accelerationIncludingGravity.y)+ Math.abs(event.accelerationIncludingGravity.z);

if (acce>max && !highFiving){
  max=acce;
  document.getElementById("acc").innerHTML = max;
}

if (max>threshhold){
  highFiving = true;

}
 if (highFiving && acce<threshhold){
   document.getElementById("status").innerHTML = "High FIVE! Max value was " + max;
 }

//document.getElementById("acc").innerHTML = document.getElementById("acc").innerHTML +"<br>" + x+ " " + y + " " + z;
}
