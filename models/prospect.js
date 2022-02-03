const {Schema, model} = require('mongoose')
const prospect = new Schema ({
    date: Date,
    containers: {
        required: true,
        containerId: [{
            type: Schema.Types.ObjectId,
            ref: 'Container',
            required: true  
        }]
    }
})

module.exports = model('Prospect', prospect)