const log = console.log
const {Router} = require('express')
const Container = require('../models/container')
const router = Router()


router.delete('/:id/delete', async (req, res) => {
/****** delete container here *******/ log('here delete container', req.params)
    log('delete id', req.params.id)              
    try {
        await Container.findByIdAndDelete(req.params.id)
        return res.redirect('/containers')
    } catch (error) {
        log('DELETE CONTAINER ERROR', error) 
    }
})
    

router.get('/:id/edit', async (req, res) => {
/****** edit container here *******/ log('here edit container', req.params, req.query)
    try {
        const container = await Container.findById(req.params.id)
        if (!req.query.allow === 'true') {
            return res.redirect('/containers')
        } else {
            res.render('editContainer', {
                    title: container.number,
                    isContainers: true,
                    container
                })        
            }
    } catch (error) {
        log('EDIT CONTAINER PAGE ERROR', error)        
    }    
})


router.get('/:id', async (req, res) => {
/****** get full container information here *******/    log('GET FULL CONTAINER PARAMS', req.params.id)
    try {
        const container = await Container.findById(req.params.id)
    // log('container', container)

    res.render('container', {
        layout:'empty',
        title: container.number,
        isContainer: true,
        container
    })
    } catch (error) {
        log('GET FULL CONTAINER PARAMSERROR', error) 
    }
    
})




module.exports = router