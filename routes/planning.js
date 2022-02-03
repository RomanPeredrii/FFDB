const log = console.log
const {Router} = require('express')
const router = Router()
const Container = require('../models/container')


router.post('/', async (req, res) => {

    log(!req.body.length)

    if (!req.body.length) { return}    
    else {
        try {
        const containers = await Container.find({_id: req.body})
        log(containers)
        res.render('planning',  {
            title: 'Planning',
            isPlan: true,
            containers
        })

            
            } catch (error) {
                log('EDIT CONTAINER ERROR', error)   
            }  

    }
        
})

module.exports = router