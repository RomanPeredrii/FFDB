const log = console.log;
const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const downtime = require("../controllers/container");
// const Driver = require('../models/driver');
const Prospect = require('../models/prospect')
const Container = require('../models/container');
const moment = require('moment')



router.post("/", auth, async (req, res) => {
  log("PLANNING", req.body);

  if (!req.body.length) { return; }
  else {
    const containers = []
  req.body.forEach(async el => {
    try {
        containers.push(await Container.findById(el));
        if (containers.length === req.body.length) {
          log(containers);
          containers.map(cont => cont.downtime = downtime(cont));
        res.send((containers));}        
    }
    catch (err){
        log('PLANNING ERROR', err);
    }
  });

  const drivers = [];
}
});

router.post('/make-plan', auth, async (req, res) => {

  // log('MAKE PLAN', req.body)
  const dateNOW = moment().locale("uk").format("L");
  let plan = new Array();

  req.body.plan.forEach(async (transportation) => {
    let container = new Object();
    plan.push(new ObjectId(transportation[0]));
    try {
      container = await Container.findByIdAndUpdate(transportation[0], { driver : new ObjectId(transportation[1])})
    }
    catch (err) {
      log('ADD DRIVER PLAN ERROR', err)      
    };
    
    if (plan.length == req.body.plan.length) {
      const prospect = new Prospect({
        user: req.session.user._id,
        containers: plan,
        date: moment().format()     
      }); 

      try {
          // await prospect.save();

await Prospect.findOne({date: {gte: dateNOW}})


      }
      catch (err) {
          log('SAVE PLAN ERROR', err)
      }
    };


  });

  

  

})

module.exports = router;
