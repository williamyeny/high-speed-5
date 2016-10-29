var socket = io();
var gameId = document.getElementById("gameId");
var socketId;

socket.emit("init", gameId);
socket.on("init", function(id) {
  socketId = id;
})
