const auth = require('../authentication.json');

const knex = require('knex')({
    client : 'mysql',
    connection : {
        host : '127.0.0.1',
        user : auth['username'],
        password : auth['password'],
        database : auth['schema'],
        insecureAuth : true
    }
})

module.exports = knex

