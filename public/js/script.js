var socket = io();
var gameId = document.getElementById("gameId").innerHTML;
var socketId;

socket.emit("init", gameId);
socket.on("init", function(id) {
  socketId = id;
});
var max = 0;
window.ondevicemotion = function(event){
  var acce = event.accelerationIncludingGravity.x + event.accelerationIncludingGravity.y + event.accelerationIncludingGravity.z;

if (acce>max){
  max=acce;
  document.getElementById("acc").innerHTML = max;
}
//document.getElementById("acc").innerHTML = document.getElementById("acc").innerHTML +"<br>" + x+ " " + y + " " + z;
}
