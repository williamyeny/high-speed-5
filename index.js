var express = require("express");
var app = express();

// var bodyParser = require('body-parser');
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));

var port = process.env.PORT || 8080;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {

  res.render('index', {});
});

var server = app.listen(port, function() {
  console.log("server started");

});

var io = require('socket.io')(server);

io.on("connection", function(socket) {
  console.log("connected");

  socket.on("get data", function() {

  });

  socket.on("disconnect", function(client) {
    console.log("disconnected");
  });
});
