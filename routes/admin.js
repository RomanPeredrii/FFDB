const log = console.log
const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find() 
        res.render('admin', {
            activeUser: req.session.user.name,
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

router.post('/:id/edit', auth, async (req, res) => {
    /****** edit container here *******/ log('here edit user', req.params, req.query)
        try {
            const user = await User.findById(req.params.id)
            if (!req.query.allow === 'true') {
                return res.redirect('/admin')
            } else { 
                
                log(user)
                res.send({
                        activeUser: req.session.user.name,
                        title: user.name,
                        // IsEdit: true,
                        place: 'Edit existing user information',
                        user
                    })        
                }
        } catch (err) {
            log('EDIT USER PAGE ERROR', err)        
        }    
    })

router.post('/add-new', auth, async (req, res) => {
    /****** add new user *******/ log('add new user', req.body)
    if (req.body.password === req.body.confirmPassword) {
        const user = new User({
        name: req.body.name, 
        login: req.body.login, 
        email: req.body.email,
        password: req.body.password
        })
        try {
            await user.save() 
            res.redirect('/admin')       
        } catch (error) {
            log('ADD NEW USER ERROR', error)
            
        }

    } else {
        res.send('password error')
    }


    })
module.exports = router