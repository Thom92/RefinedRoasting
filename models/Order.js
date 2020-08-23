const { Model } = require("objection")

class Order extends Model {

    static get tableName() {
        return "order"
    }
    static get relationMappings()
    {
        const User = require("./User.js")
        const Product = require("./Product.js")

        return {
            //ID of the user
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "order.user_id",
                    to: "user.id" 
                }
            },
            //The users role
            products: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: "order.product_id",
                    to: "products.id"
                }
            }
        }
    }
    
}

module.exports = Order