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
    const data = xlsx.utils.sheet_to_json(ws)
    const validFields = [ 'client', 'POL', 'POD', 'line', 'vessel', 'BL', 'number', 'size', 'FD']

  /****************CURRENT POSITION*************************** NEED TO ADD LOTS EXEXUTER*************/       
log(`record`, record)
data.forEach(record =>{

if ((record['20'] || record['40'])  > 1) { 

    log('number', record.number.trim().split(' '))
 /****************CURRENT POSITION*************************** NEED TO ADD LOTS EXEXUTER*************/  
    record.number.trim().split(' ').forEach((number) => {
        let newRecord = new Object = {
                    number = number,
                    size = record.size,                       
                    status = record.status,
                    client = record.client,
                    POL = record.POL,
                    POD = record.POD,
                    line = record.line,
                    vessel = record.vessel,
                    BL = record.BL,
                    FD = record.FD
                },
        
    })
    // record.size = 20; delete record['20'] 
}  
})

    data.forEach(async (record) => {      


        /****************CURRENT POSITION*************************** NEED TO ADD LOTS EXEXUTER*************/  
        // if (record['20']) { record.size = 20; delete record['20'] } 
        // if (record['40']) { record.size = 40; delete record['40'] } 
        /****************CURRENT POSITION*************************** NEED TO ADD LOTS EXEXUTER*************/




        

        Object.keys(record).forEach(field => {
            record[`${field}`] = record[`${field}`].toString().trim()
            if (!validFields.includes(field)) {
                delete record[`${field}`]
            }
        })


 
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
                log(`${file} deleted`)
                // res.redirect('/containers')
            }
    })        
    } catch (error) {
        log('DEL BUFFER ERROR', error)        
    }

   

    

} )

module.exports = router