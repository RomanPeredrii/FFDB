const log = console.log
const {Router} = require('express')
const router = Router()
const Container = require('../models/container')
const auth = require('../middleware/auth')


router.delete('/:id/delete', auth, async (req, res) => {
/****** delete container here *******/ log('here delete container', req.params)
    log('delete id', req.params.id)              
    try {
        await Container.findByIdAndDelete(req.params.id)
        return res.redirect('/containers')
    } catch (error) {
        log('DELETE CONTAINER ERROR', error) 
    }
})
    

router.get('/:id/edit', auth, async (req, res) => {
/****** edit container here *******/ log('here edit container', req.params, req.query)
    try {
        const container = await Container.findById(req.params.id)
        if (!req.query.allow === 'true') {
            return res.redirect('/containers')
        } else {
            res.render('editContainer', {
                    title: container.number,
                    IsEdit: true,
                    place: 'Edit container information',
                    container
                })        
            }
    } catch (error) {
        log('EDIT CONTAINER PAGE ERROR', error)        
    }    
})


router.get('/:id', auth, async (req, res) => {
/****** get full container information here *******/    log('GET FULL CONTAINER PARAMS', req.params.id)
    try {
        const container = await Container.findById(req.params.id)
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