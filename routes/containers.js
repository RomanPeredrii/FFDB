const log = console.log
const {Router} = require('express')
const Containers = require('../models/container')
const router = Router()

router.get('/', async (req, res) => {
    log('here containers')
    const containers = await Containers.find()
    res.render('containers', {
        title: 'Containers',
        isContainers: true,
        containers
    })

})

// router.post('/update', async (req, res) => {
//     log('here container update', req.body)
//     await Containers.update(req.body)
//     const containers = await Containers.getAll()
//     res.redirect('/containers')

// })

module.exports = router