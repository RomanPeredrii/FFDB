const log = console.log
const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')

router.post('/login', async (req, res) => {
    try {
        const {login, password} = req.body
        const user = await User.findOne({login})
        if (user) {
            const correctPswd = await bcrypt.compare(password, user.password)
            log('password?', correctPswd)
            if (correctPswd) {
                req.session.user = user
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    if (user.login === 'Admin') { 
                        return res.redirect('/admin')
                    }
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