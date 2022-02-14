const log = console.log
const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    log('Admin Page', req.session)
    res.render('admin', {
        user: req.session.user.name,
        place: 'ADD NEW USER',
        title: 'Admin Page',
        isAdmin: true
    })
    // try {
    //     const {login, password} = req.body
    //     log(login, password)
    //     const user = await User.findOne({name: login})
    //     log(user)
    //     if (user) {
    //         if (password===user.password) {
    //             req.session.user = user
    //             req.session.isAuthenticated = true
    //             req.session.save(err => {
    //                 if (err) {
    //                     throw err
    //                 }
    //                 log('AUTH', req.session)
    //                 if (user.name === 'Admin') {
    //                     res.redirect('/admin')
    //                 }
    //                 res.redirect('/containers')
    //             })
    //         }            
    //     } else {
    //         res.redirect('/')
    //     }
    // } catch (err) {
    //     log('LOGIN ERROR', err)
    // }   
})

module.exports = router