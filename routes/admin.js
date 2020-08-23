const router = require('express').Router();

router.get('/*', (req, res, next) =>
{

    if(req.session.user && req.session.user.role == "admin")

    next()
    res.sendFile('./public/html/admin.html', {root: '.' })
})

router.get("/dashboard", (req, res) => {

    //Render admin dashboard
    res.sendFile("public/html/admin.html", { root: "." })
})

module.exports = router;