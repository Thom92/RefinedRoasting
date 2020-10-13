const express = require("express")
const app = express()

//Create server
const server = require("http").createServer(app)
const io = require('socket.io')(server)
const users = {}
const serverPort = process.env.PORT || 4000;
server.listen('4000', () =>
{
    console.log(`Listening on port: ${serverPort}`)
})

io.on('connection', (socket) => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})




//Try get PORT env var else default 3000
const appPORT = process.env.PORT || 8000;

//Setup helmet

//Setup bodyparsing
const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

//Static serving from ./public
app.use(express.static("./public"))

//Setup express-session
const session = require("express-session")
const sessionConfig = require("./configs/session.json")

//Use in-memory session store for now
app.use(session({
    name: "sid",
    secret: sessionConfig["secret"],
    resave: false,
    saveUninitialized: false,  
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, //1 day
        secure: false
    }
}))

//Setup Objection & Knex
const { Model } = require("objection")
Model.knex(require("./configs/database/knexfile.js"))

//Routes
app.use('/', require('./routes/auth.js'))
app.use('/', require('./routes/index.js'))
app.use('/', require('./routes/contact.js'))
app.use('/admin', require('./routes/admin.js'))
app.use('/contact', require('./routes/contact'))
app.use('/profile', require('./routes/profile.js'))
app.use('/store', require('./routes/store.js'))
app.use('/chat', require('./routes/chat.js'))
app.use('/chattest', require('./routes/chattest.js'));
app.use('/orderhistory', require('./routes/orderhistory.js'))
//Rest API routes
app.use("/api/session", require("./routes/api/session.js"))
app.use("/api/users", require("./routes/api/user.js"))

//Listen on PORT

app.listen(appPORT,  (error) => 
{
    if(error)
    {
        console.log(error);
    }
    console.log(`listening on: ${appPORT}`)
});   