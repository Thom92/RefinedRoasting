const router = require('express').Router()

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