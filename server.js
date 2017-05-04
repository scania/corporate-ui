
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

  var dependencies = Object.keys(package.dependencies)
  dependencies.map(function(dependency) {
    var version = package.dependencies[dependency]
    app.use('/vendors/**/' + dependency + '/' + version, express.static(__dirname + '/node_modules/' + dependency) )
  })
  //https://static.scania.com/vendors/frameworks/bootstrap/3.2.0/css/bootstrap-org.css
  app.use('/vendors/frameworks/bootstrap/3.2.0/css/bootstrap-org.css', express.static(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.css') )
  console.log('FE-Dependencies: ', dependencies)

  app.get('/data', function(req, res) {
    res.json( dirTree('dist/' + (req.query.path || 'html')) )
  })

  app.listen(app.get('port'), function() {
    console.log('UX-library is now running at http://%s:%d.', process.env.COMPUTERNAME, app.get('port'))
  })
}
