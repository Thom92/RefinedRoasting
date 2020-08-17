const router = require("express").Router()
const ratelimits = require("../configs/limiters.js")
const User = require("../models/User.js")
const UserInformation = require("../models/UserInformation.js")

const knex = require("../database/knexfile.js")

//Mail reset dependencies
const { v4: uuidv4 } = require("uuid")

//Importing bcrypt to hash passwords
const bcrypt = require("bcrypt")
const { response } = require("express")
//Use rounds to set a limit for requests
const rounds = 12

router.get('/signup', (req, res) =>
{
    res.sendFile('./public/html/signup.html', { root: "." })
})

//Create new user
router.post("/signup", ratelimits.signup, async(req, res) =>
{
    let { username, password, email, firstName, lastName } = req.body
    
    //Waiting to get a user
    let user = await User.query()
    .select("user.username", "user_information.email")
    .joinRelated("user_information")
    .where("username", username)
    .orWhere("user_information.email", email)

    if(user > 0)
    {
        res.redirect("/Signup#failed");
    }
    let hashedPassword = await bcrypt.hash(password, rounds);
    await User.query().insertGraph({
        username: username,
        password: password,
        user_information:{
            first_name: firstName,
            last_name: lastName,
            email: email
        }
    })
})
module.exports = router;