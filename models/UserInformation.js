const { Model } = require("objection")

class UserInformation extends Model {

    static get tableName() {
        return "user_information"
    }
    
    static get relationMappings() {

        const User = require("./User.js")

        return {
            //The user this information belongs to
            user : {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: "user_information.user_information_id",
                    to: "user.user_id"
                }
            }
        }

    }
}

module.exports = UserInformation