const log = console.log
const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find() 
        res.render('admin', {
            user: req.session.user.name,
            place: 'USERS',
            title: 'Admin Page',
            isAdmin: true,
            users
        })
    } catch (err) {
        log('GET USERS LIST ERROR', err)
    }
    
})

router.delete('/:id/delete', auth, async (req, res) => {
    /****** delete user here *******/ log('here delete user', req.params)
        try {
            await User.findByIdAndDelete(req.params.id)
            return res.redirect('/admin')
        } catch (err) {
            log('DELETE USER ERROR', err) 
        }
    })

module.exports = router