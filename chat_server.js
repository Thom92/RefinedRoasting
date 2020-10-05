const io = require("http://localhost:3000")

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name =>
    {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('chat-message', message =>
    {
        socket.broadcast.emit('chat-message', {message : message, name: users[socket.io]})
    })
    socket.on('disconnect', () =>
    {
        socket.broadcast.emit('user-disconnected: ', users[socket.id])
        delete users[socket.id]
    })
    
})
