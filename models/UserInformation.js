const { Model } = require("objection")

class UserInformation extends Model {

    static get tableName() {
        return "user_information"
    }
    
    static get relationMappings() {

        const Users = require("./User.js")

        return {
            //The user this information belongs to
            users : {
                relation: Model.HasOneRelation,
                modelClass: Users,
                join: {
                    from: "user_information.id",
                    to: "user.id"
                }
            }
        }

    }
}

module.exports = UserInformation