const { Model } = require('objection');

const router = require('express').Router();

router.get('/orderhistory', (req, res) =>
{
    res.sendFile('/public/html/orderhistory.html', {root: "."}) 
})
module.exports = router