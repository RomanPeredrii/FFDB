const {Schema, model} = require('mongoose')
const user = new Schema ({
    name: {
        type: String,
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false /** temp **/
    },
    email: {
        type: String,
        required: false /** temp **/
    },
    department: {
        type: String
    }
})

module.exports = model('User', user)