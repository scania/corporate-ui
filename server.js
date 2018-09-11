
var express = require('express'),
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
  app.use('/', express.static(__dirname + '/node_modules'))

  app.listen(app.get('port'), function() {
    console.log('UX-library is now running at http://%s:%d.', process.env.COMPUTERNAME, app.get('port'))
  })
}
