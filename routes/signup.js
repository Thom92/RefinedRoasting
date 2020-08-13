const router = require('express').Router()

router.get('/signup', (req, res) =>
{
    res.sendFile('./public/html/signup.html', { root: "." })
})
module.exports = router;