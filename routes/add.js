const log = console.log

const {Router} = require('express')
const router = Router()
const Container = require('../models/container.js')
router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
// const container = new Container(req.body.number, req.body.size, req.body.status)
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