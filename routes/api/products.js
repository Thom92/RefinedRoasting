const router = require("express").Router()
const Product = require('../../models/Product')
const Knex = require("../../database/knexfile")

//Get all products

router.get("/", async (req, res) => {

    //Retrieve the sid
    //Query all products for store with given sid
    let products = await Product.relatedQuery("products").for(sid)
        .select("product.name", "product.description", "product.price");

    //Check if product array has any elements
    if (products.length > 0) {
        
        //Set status code to 200
        res.status(200)
    }
    else {

        //Set status code to 404 (Not Found)
        res.status(404)
    }

    //Finally return products
    res.json(products)
})
router.get('/products', (req, res)=>
{
    if(req.session.user)
    {
        res.sendFile('/public/html/products.html', {root: "."})
    }
    else
    {
        res.send(404)
    }
})

module.exports = router