//Router to change to login page
const router = require('express').Router();

//Get to login page
router.get("/login", (req, res) => {
    //Send the login.html file
    //the returned path is to get to the directory where public folder is.
    res.sendFile("./public/html/login.html", { root: "." })
})



/*function validateUsername(username)
{
const schema =
    {name: Joi.string().min(6).require()};
    return Joi.validate(username, schema);
}
router.post('/login', (req, res) =>
{
    //Object destructuring
    const { error } = validateUsername(req.body);
    if(error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }
}) */
module.exports = router;