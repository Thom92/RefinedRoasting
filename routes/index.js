const router = require('express').Router()
const User = require('../models/User');
/*router.get('/', (req, res) =>
{
    res.sendFile('./public/html/index.html', { root: "." })
})
module.exports = router;*/

router.get('/', async (req, res) =>
{
    const user = await User.query();

    console.log(user[0] instanceof User); // --> true
    console.log('there are', user.length, 'People in total');
})
module.exports = router;