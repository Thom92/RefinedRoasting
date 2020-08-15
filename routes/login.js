const router = require("express").Router()
const ratelimits = require("../configs/limiters.js")
const User = require("../models/User.js")
const UserInformation = require("../models/UserInformation.js")
const knex = require("../database/knexfile.js")

//Get to login page
router.get("/login", (req, res) => {
    //Send the login.html file
    //the returned path is to get to the directory where public folder is.
    res.sendFile("./public/html/login.html", { root: "." })
})
module.exports = router;