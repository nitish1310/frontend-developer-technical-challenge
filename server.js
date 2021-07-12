var http = require("http");
var finalhandler = require("finalhandler");
var serveStatic = require("serve-static");

const PORT = 3000;

var serve = serveStatic("./");

var server = http.createServer(function (req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});

server.listen(PORT);
