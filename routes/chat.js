const router = require('express').Router()

router.get('/chat', (req, res) =>
{
    res.sendFile('/public/html/chat.html', {root: "."})
    
})

module.exports = router;