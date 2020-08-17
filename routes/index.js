const router = require('express').Router()
const User = require('../models/User');
/*router.get('/', (req, res) =>
{
    res.sendFile('./public/html/index.html', { root: "." })
})
module.exports = router;*/

router.get('/', async (req, res) =>
{

    res.sendFile("./public/html/index.html", {root: "."})
})
module.exports = router;