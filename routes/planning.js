const log = console.log;
const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const mongoose = require('mongoose')
const Container = require('../models/container');
const downtime = require("../controllers/container");
// const Prospect = require('../models/prospect')

router.post("/", async (req, res) => {
  log("PLANNING", req.body);
  // res.render("planning");

  if (!req.body.length) { return; }
  else {
    const containers = []
  req.body.forEach(async el => {
    
    log(el.length);
    try {
        containers.push(await Container.findById(el));
        if (containers.length === req.body.length) {
          log(containers);
          containers.map(cont => cont.downtime = downtime(cont));
        res.send((containers));}
        
    }
    catch (error){
        log('PLANNING ERROR', error);
    }
  });
  // res.render('planning')
  
}
});

// router.get('/make-plan', async (req, res) => {
//     try {
//         const prospect = await Prospect.find()

//         // .populate('containers.containerId')
//         // .execPopulate()
//         if (!prospect) return
//         else {
//             log('Prospect', prospect[0].containers)
//             res.render('planning')
//         }
//     }
//     catch (error) {
//         log('GET PLANS ERROR')
//     }

// })

module.exports = router;
