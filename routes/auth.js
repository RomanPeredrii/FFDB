const log = console.log
const {Router} = require('express')
const router = Router()


router.post('/', (req, res) => {
    log('AUTH', req.body)
    res.render('planning')
})







module.exports = router