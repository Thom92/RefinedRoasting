
const router = require('express').Router();

router.get('/', (req, res) =>
{
    res.sendFile('/public/html/store.html', {root: "."}) 
})
module.exports = router