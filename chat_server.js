const io = require("http://localhost:3000")
const esacpe = require('escape-html');

class ChatServer
{
    io;
    users;

    constructor(server)
    {
        this.io = require('socket.io')(server)
        this.users = users;
    }
    
    startListening()
    {
        this.io.on('connection', (socket) =>
        {
            //Push socket to the users list
            this.users.push({user: data.user, id: data.id})
            //Emit updated users to the clients
            this.io.sockets.emit('update', getUniqueUserName(this.users))
            //Emit to all clients that a new user has joined
            this.io.sockets.emit("user_join", data)
        })

        socket.on('message', data =>
        {
            //Escape data.text to prevent users from changing html
            data.text = esacpe.text;
            //Emit data message to all clients
            this.io.sockets.emit('message', data)
        })

        socket.on('disconnect', () =>
        {
            //Go through each user in the list
            for(let index = 0; index < this.users.length; index++)
            {
                //check if socket.id equals user[i].id
                if(socket.id == this.users[index].id)
                {
                    //Emit users that are disconnected
                    this.io.sockets.emit('user-disconnected', {user: this.users[index].user})

                    //remove user for the user-list
                    this.users.splice(index, 1)
                }
            }
            this.io.sockets.emit('update', getUniqueUserName(this.users))
        })


    }

}
function getUniqueUserName(users) {
    let usernames = users.map(a => a.user)
    let uniques = new Set(usernames)
    return Array.from(uniques)
}
module.exports = ChatServer;