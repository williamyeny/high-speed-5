var socket = io();
var gameId = document.getElementById("gameId").innerHTML;
var socketId;

socket.emit("init", gameId);
socket.on("init", function(id) {
  socketId = id;
});
var max = 0;
window.ondevicemotion = function(event){
  var x = event.accelerationIncludingGravity.x;
var y = event.accelerationIncludingGravity.y;
var z = event.accelerationIncludingGravity.z;
//console.log(x + " " + y + " " + z);

if (y>max){
  max=y;
  document.getElementById("acc").innerHTML = max;
}
//document.getElementById("acc").innerHTML = document.getElementById("acc").innerHTML +"<br>" + x+ " " + y + " " + z;
}
