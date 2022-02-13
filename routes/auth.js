const log = console.log
const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const { redirect } = require('express/lib/response')

router.post('/login', async (req, res) => {
    try {
        const {login, password} = req.body
        log(login, password)
        const user = await User.findOne({name: login})
        log(user)
        if (user) {
            if (password===user.password) {
                req.session.user = user
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    log('AUTH', req.session)
                    res.redirect('/containers')
                })
            }            
        } else {
            res.redirect('/')
        }
    } catch (err) {
        log('LOGIN ERROR', err)
    }   
})

router.get('/logout', auth, (req, res) => {
    req.session.destroy(()=> {
        res.redirect('/')
    })    
})






module.exports = router