const { Model } = require("objection")

class Order extends Model {

    static get tableName() {
        return "order"
    }
    static get relationMappings()
    {
        const User = require("./User.js")
        const Product = require("./Product.js")
    }
}

module.exports = Order