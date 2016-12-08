var express = require('express');
var app = express();

var publicDir = __dirname + "/static/";

app.use(express.static('static'));

app.get('/blog', function (req, res) {
   res.sendFile( publicDir + "/blog/blog.html");
})




var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
