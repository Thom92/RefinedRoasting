const session = require('express-session');

const router = require('express').Router();

router.get('/', (req, res) =>
{
    
    res.sendFile('/public/html/orderhistory.html', {root: "."}) 
})
module.exports = router