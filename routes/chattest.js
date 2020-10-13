const router = require('express').Router();
router.get('/', (req, res) =>
{
    res.sendFile('/public/html/chattest.html', {root: "."})
})


module.exports = router;