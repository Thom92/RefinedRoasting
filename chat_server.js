const escape = require("escape-html")

class chatServer {

    io;
    users;

    constructor(server) {
        this.io = require("socket.io")(server)
        this.users = []
    }

    startListening() {
        this.io.on("connection", (socket) => {

            socket.on("user-connected", (data) => {

                //Push socket to the users list
                this.users.push({user: data.user, id: socket.id})

                //Emit updated users list to clients
                this.io.sockets.emit("update", getUniqueUsernameArray(this.users))

                //Emit to all clients that a new user has joined
                this.io.sockets.emit("user-connected", data )
            })

            socket.on("message", (data) => {
                
                //Escape data.text here so users cant change html
                data.text = escape(data.text)

                //Emit that message data to all clients/sockets
                this.io.sockets.emit("message", data)
            })

            socket.on("user-disconnected", () => {

                //Go through each user in users list
                for (let index = 0; index < this.users.length; index++) {

                    //Check if socket.id equals users[i].id
                    if (socket.id == this.users[index].id) {

                        //Emit user has disconnected to clients
                        this.io.sockets.emit("user-disconnected", { user: this.users[index].user })
                        
                        //Remove user from users with that id
                        this.users.splice(index, 1)
                    }
                }

                //Emit updated users list to clients
                this.io.sockets.emit("update", getUniqueUsernameArray(this.users))
            })

        })
    }
}

function getUniqueUsernameArray(users) {
    let usernames = users.map(a => a.user)
    let uniques = new Set(usernames)
    return Array.from(uniques)
}


module.exports = chatServer