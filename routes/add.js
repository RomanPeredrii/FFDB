const log = console.log
const {Router} = require('express')
const router = Router()
const Container = require('../models/container')
const auth = require('../middleware/auth')


router.get('/', auth, (req, res) => {
/****** render Add page *******/ log('here add', req.session.user.name)
    res.render('add', {
        activeUser: req.session.user.name,
        title: 'Add manually',
        isAdd: true,
        place: 'Add container information'
    })
})

router.post('/', auth, async (req, res) => {
/****** add new container *******/ log('add new container')
const container = new Container({
    number: req.body.number, 
    size: req.body.size, 
    status: req.body.status
    })
    try {
        await container.save() 
        res.redirect('/containers')       
    } catch (error) {
        log('ADD CONTAINER ERROR', error)
        
    }
})

module.exports = router