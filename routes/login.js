const router = require("express").Router()
const ratelimits = require("../configs/limiters.js")
const User = require("../models/User.js")
const UserInformation = require("../models/UserInformation.js")
const knex = require("../database/knexfile.js")
const bcrypt = require("bcrypt")
const { response } = require("express")
const rounds = 12
//Get to login page
router.get("/login", (req, res) => {
    //Send the login.html file
    //the returned path is to get to the directory where public folder is.
    res.sendFile("./public/html/login.html", { root: "." })
})
router.post("/login", ratelimits.login, async (req, res)=>
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
module.exports = router;