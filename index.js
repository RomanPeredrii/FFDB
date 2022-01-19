const log = console.log
const Handlebars = require('handlebars')
const expHBS = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const express = require('express')
const app = express()
const path = require('path')
const addRoutes = require('./routes/add')
const containersRoutes = require('./routes/containers')
const homeRoutes = require('./routes/home')
const containerRoutes = require('./routes/container')
const makePlan = require('./routes/makePlan')
const mongoose = require('mongoose')


app.use(express.static('public'))


const hbs = expHBS.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    extname: 'hbs'
})

const PORT = process.env.PORT || 3000


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.json({
    type: ['application/json', 'text/plain']
}))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use('/add', addRoutes)
app.use('/containers', containersRoutes)
app.use('/', homeRoutes)
app.use('/container', containerRoutes)
app.use('/makePlan', makePlan)



const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://ffdb:Alpha666Alpha@cluster0.aumhk.mongodb.net/FFDB?retryWrites=true&w=majority`,
        {useNewUrlParser: true})

        app.listen(PORT, () => {
        log(`Server is running on port ${PORT}`)
        })

    }
    catch (err) {
        log("START ERROR",err)
    }

}

start()