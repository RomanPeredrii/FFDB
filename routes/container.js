const log = console.log
const {Router} = require('express')
const Containers = require('../models/container')
const router = Router()

router.get('/', async (req, res) => {
    log('hereReq', req)
    // log('hereRes', res)
    const containers = await Containers.getAll()
    res.render('container', {
       title: 'Container',
       isContainers: true,
       containers
    })

})

router.get('/:container/edit', async (req, res) => {
    log('here edit container', req.params, req.query)
    const container = await Containers.getByNumber(req.params.container)
    if (!req.query.allow) {
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


router.get('/:container', async (req, res) => {
    log('PARAMS', req.params)
    const container = await Containers.getByNumber(req.params.container)
    log('container', container)

res.render('container', {
    layout:'empty',
    // title: container.number,
    isContainer: true,
    container
 })
})
module.exports = router