const { Model } = require('objection');

const router = require('express').Router();

router.get('/products', (req, res) =>
{
    res.sendFile('/public/html/products.html', {root: "."}) 
})
module.exports = router