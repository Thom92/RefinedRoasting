

const router = require('express').Router();

router.get('/', (req, res) =>
{
    res.sendFile('/public/html/contact.html', {root: "."}) 
})
module.exports = router;