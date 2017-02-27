
var express = require('express'),
    dirTree = require('directory-tree'),
    app = express()

module.exports = server

function server() {
  app.use(express.static(__dirname + '/dist'))
  app.use('/', express.static(__dirname + '/src/app'))
  app.use('/libs', express.static(__dirname + '/static_modules'))

  app.set('port', process.env.PORT || 1337);

  app.get('/data', function(req, res) {
    res.json( dirTree('dist/' + (req.query.path || 'html')) )
  })

  app.listen(app.get('port'), function () {
    console.log('UX-library is now running at http://localhost:%d', app.get('port'))
  })
};
