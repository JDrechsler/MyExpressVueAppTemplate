//TEMPLATE

var express = require('express')
var app = express()
var server = require('http').Server(app)
var port = process.env.PORT || 3000
var io = require('socket.io')(server)

var connectedIds = []

server.listen(port, function () {
    console.log(`Listening on Port: ${port}, https://web-entwicklung-anunymux.c9users.io`);
    showConnectedClientIds()
})

app.use(express.static(__dirname))

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {

    connectedIds.push(socket.id)
    console.log(`A client connected: ${socket.id}`)
    showConnectedClientIds()

    socket.on('request-answer', function () {
        socket.emit('response-answer', 'Halloooooo')
    })

    //A client disconnects from the server
    socket.on('disconnect', function () {

        for (var i = connectedIds.length - 1; i >= 0; i--) {
            if (connectedIds[i] === socket.id) {
                connectedIds.splice(i, 1)
            }
        }
        console.log(`Client left: ${socket.id}`);
        showConnectedClientIds()
    })
})

showConnectedClientIds = function () {
    console.log('');
    console.log('Connected client ids:')

    if (connectedIds.length < 1) {
        console.log('none');
    }
    else {
        for (var i = 0; i < connectedIds.length; i++) {
            console.log(connectedIds[i])
        }
    }

    console.log('');
}
