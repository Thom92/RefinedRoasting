const { Model } = require("objection")

class User extends Model {

    static get tableName() {
        return "user"
    }

    static get relationMappings() {

        const UserInformation = require("./UserInformation.js")
        const UserRole = require("./UserRole.js")
        
        return {
            //Information about the user
            information: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserInformation,
                join: {
                    from: "user.user_information_id",
                    to: "user_information.id" 
                }
            },
            //The users role
            role: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserRole,
                join: {
                    from: "user.role_id",
                    to: "user_role.id"
                }
            }
        }
    }

}

module.exports = User