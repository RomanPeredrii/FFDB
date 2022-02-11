const log = console.log
const {Router} = require('express')
const router = Router()


router.post('/login', (req, res) => {
    req.session.isAuthenticated = true
    log('AUTH', req.session)
    res.redirect('/containers')
})

router.get('/logout', (req, res) => {
    req.session.destroy(()=> {
        res.redirect('/')
    })

    
})






module.exports = router