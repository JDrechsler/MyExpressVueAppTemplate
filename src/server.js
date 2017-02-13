var express = require('express')
var app = express()
var server = require('http').Server(app)
var port = process.env.PORT || 3000

var io = require('socket.io')(server)

server.listen(port, function() {
    console.log(`Listening on Port: ${port}, https://web-entwicklung-anunymux.c9users.io`);
})

app.use(express.static(__dirname))

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket) {
    console.log(`A client connected: ${socket.id}`)

    //The client sends 'getApi' event to server
    socket.on('halloVonClient', function() {
        console.log('Hallo Server vom Client')
        socket.emit('halloVonServer', 'Hallo Client vom Server!')
    })

    //A client disconnects from the server
    socket.on('disconnect', function() {
        console.log(`Client left: ${socket.id}`);
    })
})
