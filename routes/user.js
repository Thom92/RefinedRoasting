const router = require("express").Router()
const User = require("../../models/User.js")
const Knex = require("../../database/knexfile.js")

router.get("/*", (req, res, next) =>
{
    if(req.session.user)
    {
        next()
    }
    else{
        res.status(401).send("Sorry mate, you are not authorized to be here")
    }
})
router.get("/", async (req, res) =>
{
    let users = await User.query().
    select("user.username", 
    "information.firstname", 
    "information.lastname", 
    "information.email")
    .joinRealated("information")
    .joinRealated("role")

    if(users.length > 0)
    {
        res.status(200)
        console.log(users)
    }
    else
    {
        res.status(404).send("Couldn´t find any users")
    }
    res.json(users)
})

//Get a specific user
router.get("/:uid", async (req, res) => 
{
    //Retrieve user id from params
    let {uid} = req.params
    //Find specific user 
    let user = await User.query()
    .select("user.id", "user.username", "info.firstname", "info.lastname", "info.email")
    .innerJoin("user_information AS info", {"user.user_information_id" : "info.id"})
    .findById(uid)
    //If user was found
    if(user != undefined)
   {
       res.json(user)
       res.status(200)
       console.log(user)
    }
   
    else
    {
        res.status("User not found", 404)
    }

})