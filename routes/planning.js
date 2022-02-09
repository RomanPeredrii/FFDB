const log = console.log
const mongoose = require('mongoose')
const {Router} = require('express')
const router = Router()
const Container = require('../models/container')
const Prospect = require('../models/prospect')


router.post('/', async (req, res) => {  
    if (!req.body.length) { return}    
    else {
        const prospect = new Prospect({})
        try {
            const containers = await Container.find({_id: req.body})            
            containers.forEach(container => prospect.containers.push({containerId : container._id}))
            // await prospect.save()
            log('save plan')
            // res.redirect('/planning/make-plan')  
            res.render('containers')          
        } 
        catch (error){
            log('PLANNING ERROR', error)   
        } 
    }        
})

router.get('/make-plan', async (req, res) => {
    try {
        const prospect = await Prospect.find()


        // .populate('containers.containerId')
        // .execPopulate()
        if (!prospect) return
        else {
            log('Prospect', prospect[0].containers)
            res.render('planning')
        }
    }
    catch (error) {
        log('GET PLANS ERROR')
    }
 
})

module.exports = router