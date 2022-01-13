const log = console.log 

const {Schema, model} = require('mongoose')
const container = new Schema ({
    number: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }

})

module.exports = model('Container', container)

// const { v4: uuidv4 }  = require('uuid')
// const fs = require('fs')
// const path = require('path')

// class Container {
//     constructor (number, size, status) {
//         this.number = number
//         this.size = size
//         this.status = status
//         this.id = uuidv4()
//     }

//     toJSON() {
//         return {   
//             number: this.number,
//             size: this.size,
//             status: this.status,
//             id: this.id
//             }
        
//     }

//     static async update(container) {
//         const containers = await Container.getAll()
//         const idx = containers.findIndex(c => c.id === container.id)
//         log("model container update", container, idx)
//         containers[idx] = container
//         log('containers updated', containers[idx])
//         return new Promise((res, rej) => {
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'containers.json'), 
//                 JSON.stringify(containers), 
//                 err => {
//                     if (err) rej(err)
//                     else {
//                         res() 
//                     }          
//                 }
//             )
//         })     


//     }

//     async save() {
//         const containers = await Container.getAll()
//         containers.push(this.toJSON())
//         // log('container', containers)
//         return new Promise((res, rej) => {
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'containers.json'), 
//                 JSON.stringify(containers), 
//                 err => {
//                     if (err) rej(err)
//                     else {
//                         res() 
//                     }          
//                 }
//             )
//         })     
       
//     }
        

//     static getAll() {
//         return new Promise((res, rej) => {
//             fs.readFile(
//                 path.join(__dirname, '..', 'data', 'containers.json'), 'utf-8', (err, data) => {
//                     if (err) rej(err)
//                     else {
//                         res(JSON.parse(data))
//                     }
//                 }
//             )
//         })
//     }

//     static async getByNumber(number) {
//         const containers = await Container.getAll()
//         return containers.find(c => c.number === number)
//     }
        
// }


// module.exports = Container