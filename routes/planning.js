const log = console.log
const {Router} = require('express')
const router = Router()
const Container = require('../models/container')


router.post('/', async (req, res) => {


    // res.redirect('/')
    // if (!req.body.length) { return}
    // log(!req.body.length)
    // else {
        try {
        // log( await Container.find({_id: req.body}))  
        
        // const containers = await Container.find({_id: req.body})
        // log(containers)
        // res.render('planning',  {
        //     title: 'Planning',
        //     isPlan: true,
        //     containers
        // })

            

                // res.redirect('/makePlan')
            
            } catch (error) {
                log('EDIT CONTAINER ERROR', error)   
            }  

    // }
        
})

module.exports = router