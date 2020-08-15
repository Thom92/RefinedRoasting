const router = require("express").Router()
const User = require("../models/User")
const knex = require("../database/knexfile.js")
let userId = []
 
router.get("/profile", async (req, res) => 
{    

    //Retrieve sign up information
    let { username, password, email, firstname, lastname } = req.body

    //Check for already existing username & email
    let users = await User.query()
    .select("user.username")
    //Send the signup.html file
    userId.map[users]
    console.log(userId)

    //res.sendFile("userprofile/:id", { root : "." })
})

router.get("/userprofile/:id", (req, res)=>
{
    users.find()
    
    //sendFile("/public/html/userprofile.html", {root: "."})
})
module.exports = router