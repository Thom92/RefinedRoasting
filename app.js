const express = require("express")
const app = express()

//Create server
const server = require("http").createServer(app)
//Try get PORT env var else default 3000
const PORT = process.env.PORT || 3000;

//Setup helmet

//Setup bodyparsing
const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

//Static serving from ./public
app.use(express.static("public"))

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
Model.knex(require("./database/knexfile.js"))

//Routes
app.use('/', require('./routes/auth.js'))
app.use('/', require('./routes/index.js'))
app.use('/', require('./contact.js'))
app.use('/admin', require('./routes/admin.js'))
app.use('/profile', require('./routes/profile.js'))
app.use('/store', require('./routes/store.js'))
app.use('/chat', require('./routes/chat.js'))
app.use('/orderhistory', require('./routes/orderhistory.js'))
//Rest API routes
app.use("/api/session", require("./routes/api/session.js"))
app.use("/api/users", require("./routes/api/user.js"))
//Chat server
const chatServer = new(require('./chat_server.js'))(server)
chatServer.startListening();
//Use public files
app.use(express.static(__dirname + '/public'));
//Listen on PORT

app.listen(PORT,  (error) => 
{
    if(error)
    {
        console.log(error);
    }
    console.log(`listening on: ${PORT}`)
});   