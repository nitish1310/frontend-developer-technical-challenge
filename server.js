var http = require("http");
var fs = require("fs");
var nStatic = require("node-static");
var finalhandler = require("finalhandler");
var serveStatic = require("serve-static");

// const PORT = 3000;

// var fileServer = new nStatic.Server("./public");

// fs.readFile("./index.html", function (err, html) {
//   if (err) throw err;

//   http
//     .createServer(function (request, response) {
//       response.writeHeader(200, { "Content-Type": "text/html" });
//       response.write(html);
//       response.end();
//     })
//     .listen(PORT);
// });

var serve = serveStatic("./");

var server = http.createServer(function (req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});

server.listen(8000);
