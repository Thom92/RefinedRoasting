const router = require('express').Router();

router.get('/admin', (req, res) =>
{
    res.sendFile('./public/html/admin.html', {root: '.' })
})

module.exports = router;