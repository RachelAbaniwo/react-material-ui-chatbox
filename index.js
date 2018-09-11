const http = require('http')
const express = require('express')
const socketio = require('socket.io')


const app = express()
const socketServer = http.createServer(app)

const io = socketio.listen(socketServer)

io.on('connection', () => {
  console.log('A USER JUST CONNECTED.')
})

socketServer.listen(4200, () => console.log('App running on port 4200'))
