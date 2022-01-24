const log = console.log
const {Router} = require('express')
const Container = require('../models/container')
const router = Router()
const path = require('path')
const moment = require('moment');
const multer  = require('multer')
const upload = multer({ dest: './buffer' })
const xlsx = require('xlsx')
const fs = require('fs')


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
    const file = path.join(__dirname, '..', req.file.path)
    const wb = xlsx.readFile(file)
    const ws = wb.Sheets[wb.SheetNames[0]];
    let data = xlsx.utils.sheet_to_json(ws)
    
    const fields = {
        [`Клиент`] : `client`,
        [`POL`] : `POL`,
        [`POD`] : `POD`,
        [`Судозаход`] : `vessel`,
        [`Линия`] : `line`,
        [`К-во 20`] : `20`,
        [`К-во 40`] : `40`,
        [`Коносамент`] : `BL`,
        [`Список контейнеров`] : `number` 
    }
    let newData = []
    let rawData = []

    

    data.map((record, i) =>{

    /****************CURRENT POSITION***************
     adjustment names fields & entries *************/  

        // if (record['20']) { record.size = 20; delete record['20'] } 
        // if (record['40']) { record.size = 40; delete record['40'] } 
        
        log('1 ', record)

        Object.keys(record).forEach(field => {
            if (fields[field.toString().trim()]) {
                if (record[fields[field.toString().trim()]] != record[field].toString().trim()) {
                record[fields[field.toString().trim()]] = record[field].toString().trim()
                delete record[field]     
                }
            } else {
                delete record[field]
            }
        })

        log('2 ', record)
        
        if ((record['20'] || record['40'])  > 1) {
            if (record['20']) { record.size = `20`; delete record['20'] } 
            if (record['40']) { record.size = `40`; delete record['40'] }              
            record.number.trim().split(' ').map((number) => {
                
                record.number = number
                // log(record)
                rawData.push(Object.entries(record)) /** need to try Object.defineProperty(o, nk, Object.getOwnPropertyDescriptor(o, ok)); delete o[ok] */
            })   
            data.splice(i,1)
        } else { return }         
    })
    // log(rawData)
    newData = rawData.map(entries => {
        return Object.fromEntries(entries)
    })
    data = data.concat(newData)
    log('data', data)

    
    
    

    data.forEach(async (record) => {      



        try {
            // await Container.findOneAndUpdate(
            //     {
            //         number: record.number
            //     }, 
            //     {
            //         number: record.number,
            //         size: record.size,                       
            //         status: record.status,
            //         client: record.client,
            //         POL: record.POL,
            //         POD: record.POD,
            //         line: record.line,
            //         vessel: record.vessel,
            //         BL: record.BL,
            //         FD: record.FD
            //     }, 
            //     {
            //         new: true,
            //         upsert: true 
            //     })                
                
        } catch (error) {
            log('ADD MANY CONTAINERS ERROR', error)                
        }
    })

    try {
        await fs.unlink(file, (error) => {
            if (error) throw error
            else {
                log(`BUFFER: ${file} deleted`)
            }
        })        
    } catch (error) {
        log('DEL BUFFER ERROR', error)        
    }

} )

module.exports = router