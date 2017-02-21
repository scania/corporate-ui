
var express = require('express'),
    app = express(),
    dirTree = require('directory-tree'),
    port = 1337;

app.use(express.static(__dirname + '/dist'))
app.use('/', express.static(__dirname + '/src/app'))
app.use('/libs', express.static(__dirname + '/node_modules'))

app.get('/data', function(req, res) {
  res.json( dirTree('dist/' + (req.query.path || 'html')) )
})

app.listen(port, function () {
  console.log('UX-library is now running at http://localhost:%d', port)
})
