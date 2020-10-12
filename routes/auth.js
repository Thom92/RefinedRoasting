const router = require("express").Router()
const ratelimits = require("../configs/limiters.js")
const User = require("../models/User.js")
const UserInformation = require("../models/UserInformation.js")

const knex = require("../configs/database/knexfile.js")

//Importing bcrypt to hash passwords
const bcrypt = require("bcrypt")
const { response } = require("express")
const rounds = 12
router.get("/signin", (req, res) => {
    //Send the signin.html file
    //the returned path is to get to the directory where public folder is.
    res.sendFile("./public/html/signin.html", { root: "." })
})
router.post("/signin", ratelimits.login, async (req, res)=>
{
    let { username, password} = req.body

    let user = await User.query()
    .select("user.username", "user.password", "role.role")
    .joinRelated("role")
    .where("username", username)
    .first()

    if(user != undefined)
    {
        if (await bcrypt.compare(password, user.password))
        {
            req.session.authenticated = false
            req.session.user = 
            {
                id: user.user_id,
                username: user.username,
                role: user.role_id
            }
            req.session.authenticated = true;
            res.status(200).json({status: "OK"})
        }
        else {
            //Send 401 status code with json object
            res.status(401).json({ status: "Unauthorized", message: "invalid-password" })
        }
    
    }
    else {
        //Send 401 status code with json object
        res.status(401).json({ status: "Unauthorized", message: "invalid-user" })
    }
})
router.post('/signout', (req, res) =>
{
    req.session.destroy();
    res.redirect('/');
})
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



module.exports = router