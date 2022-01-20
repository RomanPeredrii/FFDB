const log = console.log
const {Router} = require('express')
const Container = require('../models/container')
const router = Router()
const path = require('path')
const moment = require('moment');
const multer  = require('multer')
const upload = multer({ dest: './bufer' })
const xlsx = require('xlsx')


const dateTime = () => { return (moment().locale('us').format('MMMM Do YYYY, hh:mm:ss a')) }
log(dateTime());

router.get('/', async (req, res) => {
/******* get all containers here *******/  log('here containers')
    try {
        const containers = await Container.find()
        res.render('containers', {
        title: 'Containers',
        isContainers: true,
        containers
    })        
    } catch (error) {
        log('GET ALL CONTAINERS ERROR', error)        
    }
})

router.post('/edit', async (req, res) => {
    /******* get all containers here *******/    log('here container edit & containers page update', req.body)
    const {id} = req.body
    log('id = ', id)
    delete req.body.id
    log('body = ', req.body)
    try {
        await Container.findOneAndUpdate(id, req.body)    
        res.redirect('/containers')
    
    } catch (error) {
        log('EDIT CONTAINER ERROR', error)   
    }
})

router.post('/add-many', upload.single('file'), async (req, res) => {
    const wb = xlsx.readFile(path.join(__dirname, '..', req.file.path))
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(ws)

        
    log('data', data)   

/****************CURRENT POSITION****************************/



} )

module.exports = router