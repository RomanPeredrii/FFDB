const log = console.log
const {Router} = require('express')
const Containers = require('../models/container')
const router = Router()

router.post('/', async (req, res) => {
    log('here make plan', req.body)})

module.exports = router