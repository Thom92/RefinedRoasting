const router = require("express").Router()
const ratelimits = require("../configs/limiters.js")
const User = require("../models/User.js")
const UserInformation = require("../models/UserInformation.js")

const knex = require("../database/knexfile.js")

//Mail reset dependencies
/*const { v4: uuidv4 } = require("uuid")
const nodemailer = require("nodemailer")
const emailCreds = require("../configs/mail_credentials.json")

//Transporter object
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth : {
        user: emailCreds["email"],
        pass: emailCreds["password"]
    }
})*/

//Importing bcrypt to hash passwords
const bcrypt = require("bcrypt")
const { response } = require("express")
const rounds = 12

router.get("/login", (req, res) => {
    
    //Send the login.html file
    res.sendFile("public/html/login.html", { root: "." })
})

router.post("/login", ratelimits.login, async (req, res) => {
    //Retrieve login information
    let { username, password } = req.body
    console.log(req.body)
    //Try to find a user in db where username matches
    let user = await User.query()
        .select("user.id", "user.username", "user.password", "user.role_id")
        .joinRelated("role")
        .where("username", username)
        .first()
    //If user has been found
    if (user != undefined) {
        //Compare given password with hashed password
        if (await bcrypt.compare(password, user.password)) {
            
            //Append new session attributes to show authentication in future requests.
            req.session.authenticated = false
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role_id
            }
                //Change session authenticated attribute to true
                req.session.authenticated = true
                //Send 200 status code with json object
                return res.status(200).json({ status: "OK" })
        }

        //Given password was wrong
        else {
            //Send 401 status code with json object
            res.status(401).json({ status: "Unauthorized", message: "invalid-pass" })
        }
    }

    //User was not found
    else {
        //Send 401 status code with json object
        res.status(401).json({ status: "Unauthorized", message: "invalid-user" })
    }
})
router.get("/signup", (req, res) => {
    
    //Send the signup.html file
    res.sendFile("public/html/signup.html", { root : "." })
})

router.post("/signup", ratelimits.signup, async (req, res) => {
    //Retrieve sign up information
    let { username, password, email, firstname, lastname } = req.body

    //Check for already existing username & email
    let users = await User.query()
        .select("user.username", "information.email")
        .joinRelated("information")
        .where("username", username)
        .orWhere("information.email", email)
 
    //If user(s) are found
    if (users > 0) {
        res.redirect("/signup#failed")
    }
    else
    {
        //We can safely insert new user into db
    let hashedPassword = await bcrypt.hash(password, rounds)

    //Use insertGraph to insert both user & userinformation
    await User.query().insertGraph({
        username: username,
        password: hashedPassword,
        information : {
            first_name: firstname,
            last_name: lastname,
            email: email
        }
    })
    console.log(1, username, password)
    //Redirect profile page
    res.sendFile('/public/html/userprofile.html', {root: "."}) 
    }
})
module.exports = router