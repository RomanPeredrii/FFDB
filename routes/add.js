const log = console.log

const {Router} = require('express')
const router = Router()
const Container = require('../models/container')


router.get('/', (req, res) => {
/****** render Add page *******/ log('here add')
    res.render('add', {
        title: 'Add manually',
        isAdd: true,
        place: 'Add container information'

    })
})

router.post('/', async (req, res) => {
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