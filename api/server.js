var jsonServer = require('json-server')
var db = require('./db')

var port = 4000

var server = jsonServer.create()
var router = jsonServer.router(db())

server.use(jsonServer.defaults())
server.use(router)

server.listen(port)
console.log(`Api server listening on http://localhost:${port}`)
