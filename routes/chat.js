const router = require('express').Router()

router.get("/", (req, res) => {

    //Check if session is authenticated
    if (req.session.authenticated) {
        res.sendFile("public/html/chat.html", { root : "."})
    }
    else {
        res.redirect("/signin")
    }
})

module.exports = router;