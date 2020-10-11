const { Model } = require('objection');

const router = require('express').Router();

router.get('/contact', (req, res) =>
{
    res.sendFile('/public/html/contact.html', {root: "."}) 
})
module.exports = router;