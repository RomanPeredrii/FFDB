const log = console.log
const {Router} = require('express')
const Container = require('../models/container')
const router = Router()

router.get('/', async (req, res) => {
/******* get all containers here *******/  log('here containers')
    try {
        const containers = await Container.find()
        res.render('containers', {
        title: 'Containers',
        isContainers: true,
        containers
    })        
    } catch (error) {
        log('GET ALL CONTAINERS ERROR', error)        
    }
    

})



router.post('/update', async (req, res) => {
/******* get all containers here *******/    log('here containers page update', req.body)
    const containers = await Container.find()
    // await containers.update(req.body)
    
    res.redirect('/containers')

})

module.exports = router