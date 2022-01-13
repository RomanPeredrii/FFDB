const log = console.log
const {Router} = require('express')
const Container = require('../models/container')
const router = Router()

// router.get('/', async (req, res) => {
//     // log('hereReq', req)
//     // log('hereRes', res)
//     const containers = await Container.find()
//     res.render('container', {
//        title: 'Container',
//        isContainers: true,
//        containers
//     })

// })

router.get('/:id/edit', async (req, res) => {
/****** edit container here *******/ log('here edit container', req.params, req.query)
    const container = await Container.findById(req.params.id)
      if (!req.query.allow === 'true') {
        log('allow false', req.query.allow)
        return res.redirect('/')
    } else {
        log('allow', req.query.allow, container)
        res.render('editContainer', {
                title: container.number,
                isContainers: true,
                container
            })
    }

    
})


router.get('/:id', async (req, res) => {
/****** get full container information here *******/    log('GET FULL CONTAINER PARAMS', req.params.id)
    const container = await Container.findById(req.params.id)
    log('container', container)

res.render('container', {
    layout:'empty',
    title: container.number,
    isContainer: true,
    container
 })
})




module.exports = router