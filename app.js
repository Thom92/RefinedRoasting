//Framework
const express = require('express');
const app = express();
const session = require('express-session');
const sessionConfig = require('./configs/session.json')
const nodemailer = require('nodemailer');
//Objection
const { Model } = require('objection')
Model.knex(require('./database/knexfile.js'))

//limiter
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
//PORT to enter
const PORT = process.env.PORT || 3000;
//Server
const server = require('http').createServer(app)

//static serving from ./public
app.use(express.static('public'))
//helmet


//Body-parser
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())


//Routes
app.use('/', require('./routes/index.js'))
//app.use('/', require('./routes/authorization.js'))
app.use('/', require('./routes/login.js'))
app.use('/', require('./routes/signup.js'))
app.use('/', require('./routes/contact.js'))
app.use('/', require('./routes/admin.js'))

//Set up session
//Listen on PORT
app.listen(PORT,  (error) => 
{
    if(error)
    {
        console.log(error);
    }
    console.log(`listening on: ${PORT}`)
});   