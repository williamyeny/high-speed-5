var express = require("express");
var app = express();

// var bodyParser = require('body-parser');
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));

var port = process.env.PORT || 8080;

var games = {};

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {

  res.render('index');
});

app.get("/create", function(req, res) {
  var randomId = 0;
  do {
   randomId  = Math.floor(Math.random()*900000) + 100000;
  } while (randomId in games);

  games[randomId] = {};
  res.redirect("/game/randomId");
});

app.get("/game/:gameId", function(req, res) {
  if (Object.keys(games[gameId]).length == 2) {
    res.render('oops', {message: "This game is full!"});
  }

  if (!gameId in games) {
    res.render("oops", {message: "Game not found!"});
  }

  res.render('game', {gameId: gameId});
});

var server = app.listen(port, function() {
  console.log("server started");

});

var io = require('socket.io')(server);

io.on("connection", function(socket) {
  console.log("client connected");

  socket.on("init", function(gameId) {
    games[gameId][socket.id] = {};
    socket.emit("init", socket.id);
    console.log("client initiated");
  });

  socket.on("disconnect", function(client) {
    for (var key in games) {
      if (socket.id in games[key]) {
        delete games[key][socket.id]; //remove id from game
      }
      if (Object.keys(games[key]).length == 0) { //if there are no more players, delete server
        delete games[key];
      }
    }
    console.log("disconnected");
  });
});
