
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
    var version = package.dependencies[dependency].replace(/[^\d.]/g, '').replace(/^\./, '')
    app.use('/vendors/**/' + dependency + '/' + version, express.static(__dirname + '/node_modules/' + dependency) )
  })
  console.log('FE-Dependencies: ', dependencies)

  app.use('/resources/logotype/scania', express.static(__dirname + '/dist/images') )
  app.use('/vendors/**/bootstrap-org.css', express.static(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.css') )
  app.use('/vendors/**/bootstrap-org.css.map', express.static(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.css.map') )


  app.get('/data', function(req, res) {
    res.json( dirTree('dist/' + (req.query.path || 'html')) )
  })

  app.listen(app.get('port'), function() {
    console.log('UX-library is now running at http://%s:%d.', process.env.COMPUTERNAME, app.get('port'))
  })
}
