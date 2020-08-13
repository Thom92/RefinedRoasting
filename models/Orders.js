const { Model } = require("objection")

class Orders extends Model {

    static get tableName() {
        return "orders"
    }

}

module.exports = Orders