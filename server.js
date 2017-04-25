
var express = require('express'),
    dirTree = require('directory-tree'),
    package = require('./package.json'),
    app = express()

module.exports = server

function server() {
  app.set('port', process.env.PORT || 1337)

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })
  app.use(express.static(__dirname + '/dist'))
  app.use('/', express.static(__dirname + '/src/views'))

  Object.keys(package.dependencies).map(function(dependency) {
    var version = package.dependencies[dependency];
    //console.log('/frameworks/' + dependency + '/' + version + '/');
    app.use('/vendors/frameworks/' + dependency + '/' + version, express.static(__dirname + '/node_modules/' + dependency) )
    app.use('/vendors/components/**/' + dependency + '/' + version, express.static(__dirname + '/node_modules/' + dependency) )
  })

  app.get('/data', function(req, res) {
    res.json( dirTree('dist/' + (req.query.path || 'html')) )
  })

  app.listen(app.get('port'), function() {
    console.log('UX-library is now running at http://localhost:%d.', app.get('port'))
  })
}
