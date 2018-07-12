
var express = require('express'),
    dirTree = require('directory-tree'),
    app = express()

module.exports = server

function server() {
  app.set('port', process.env.PORT || 1337)

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  app.use(express.static(__dirname + '/demo'))
  app.use('/', express.static(__dirname + '/dist'))

  // var dependencies = Object.keys(package.dependencies)
  // dependencies.map(function(dependency) {
  //   var version = package.dependencies[dependency].replace(/[^\d.]/g, '').replace(/^\./, '')
  //   app.use('/vendors/**/' + dependency + '/' + version, express.static(__dirname + '/node_modules/' + dependency) )
  // })

  // app.use('/vendors/frameworks/:dependency/:version', express.static(__dirname + '/node_modules/' + app.param('dependency')) )

  /*app.use('/vendors/:type/:dependency/:version/*', function(req, res) {
    path = req.params[0].replace('bootstrap-org', 'bootstrap')
    dependency = req.params.dependency
    if (!req.params.version.match(/\d.\d.\d/g)) {
      path = path.substring(path.indexOf("/") + 1)
      dependency = req.params.version
    }
    res.sendFile(__dirname + '/node_modules/' + dependency + '/' + path)
  })*/

  app.use('/resources/logotype/scania', express.static(__dirname + '/dist/images') )

  app.get('/data', function(req, res) {
    res.json( dirTree('dist/' + (req.query.path || 'components')) )
  })

  app.listen(app.get('port'), function() {
    console.log('UX-library is now running at http://%s:%d.', process.env.COMPUTERNAME, app.get('port'))
  })
}
