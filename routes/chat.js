const io = require('socket.io')(5000)
const router = require('express').Router()

const users = {}

router.get('/', (req, res) =>
{
    res.sendFile('/public/html/chat.html', {root: "."})
})
    //Give each user a socket
io.on('connection', socket => {
    socket.on('new-user', name =>
    {
        users[socket.id] = name
        socket.broadcasat.emit('user-connected', name)
    })
    socket.emit('chat-message', "Welcome to Refined Roasting chat!")
    socket.on('send-chat-message', message =>
    {
        socket.broadcasat.emit('chat-message', {message : message, name: users[socket.io]})
    })
    socket.on('disconnect', name =>
    {
        socket.broadcasat.emit('user-disconnected: ', users[socket.id])
        delete users[socket.id]

    })
    
    })

module.exports = router