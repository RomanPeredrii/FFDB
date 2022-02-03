const {Schema, model} = require('mongoose')
const user = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false /** temp **/
    },
    password: {
        type: String,
        required: false /** temp **/
    },
    department: {
        type: String
    }
})

module.exports = model('User', user)