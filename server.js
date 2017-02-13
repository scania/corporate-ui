
var express = require('express'),
    app = express(),
    dirTree = require('directory-tree'),
    port = 1337;

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/html/library.html')
})

app.get('/component', function (req, res) {
  res.sendFile(__dirname + '/html/component.html')
})

app.get('/data/:section', function(req, res) {
  res.json( dirTree('html/' + req.params.section) )
})

app.listen(port, function () {
  console.log('UX-library is now running at http://localhost:', port)
})
