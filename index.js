const log = console.log
const Handlebars = require('handlebars')
const expHBS = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const express = require('express')
const app = express()
const session = require("express-session")
const MongoStore = require('connect-mongodb-session')(session)
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/user')
const addRoutes = require('./routes/add')
const containersRoutes = require('./routes/containers')
const homeRoutes = require('./routes/home')
const containerRoutes = require('./routes/container')
const planningRoutes = require('./routes/planning')
const authRoutes = require('./routes/auth')
const {DB} = require('./data.js')
const checkUser = require('./controllers/users')
const varMid = require('./middleware/variables')



const hbs = expHBS.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    extname: 'hbs'
})

const PORT = process.env.PORT || 3000
const store = new MongoStore({
    collection: 'sessions',
    uri: DB
})


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.json({
    type: ['application/json', 'text/plain']
}))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: "some secret",
    resave: false, 
    saveUninitialized: false,
    store
}))

app.use(varMid)
app.use(express.urlencoded({extended: true}))
app.use('/add', addRoutes)
app.use('/containers', containersRoutes)
app.use('/', homeRoutes)
app.use('/container', containerRoutes)
app.use('/planning', planningRoutes)
app.use('/auth', authRoutes)

const start = async () => {
    try {
        await mongoose.connect(`${DB}`, {useNewUrlParser: true})
        app.listen(PORT, () => {
        log(`Server is running on port ${PORT}`)
        })
        // await checkUser()
    }
    catch (err) {
        log("START ERROR",err)
    }
}

start()