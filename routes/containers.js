const log = console.log
const {Router} = require('express')
const Container = require('../models/container')
const router = Router()
const { Server } = require("socket.io");




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



router.post('/edit', async (req, res) => {
    /******* get all containers here *******/    log('here container edit & containers page update', req.body)
    const {id} = req.body
    log('id = ', id)
    delete req.body.id
    log('body = ', req.body)
    try {
        await Container.findOneAndUpdate(id, req.body)    
        res.redirect('/containers')
    
    } catch (error) {
        log('EDIT CONTAINER ERROR', error)   
    }




})

module.exports = router