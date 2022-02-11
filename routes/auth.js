const log = console.log
const {Router} = require('express')
const router = Router()
const User = require('../models/user')


router.post('/login', async (req, res) => {
    const user = await User.findById('6205354ce210f5a486e4e1d8')
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save(err => {
        if (err) {
            throw err
        }
        log('AUTH', req.session)
        res.redirect('/containers')
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(()=> {
        res.redirect('/')
    })

    
})






module.exports = router