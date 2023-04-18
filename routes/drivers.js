const log = console.log;
const { Router } = require("express");
const router = Router();
const Driver = require("../models/driver");
const auth = require("../middleware/auth");


/******* get page all drivers here *******/ 
router.get("/", auth, async (req, res) => {
log("here get list of all drivers");
    try {
      const drivers = await Driver.find();
      res.render("drivers", {
        activeUser: req.session.user.name,
        place: "Drivers",
        title: "Drivers",
        isDrivers: true,
        drivers
      });
    } catch (err) {
      log("GET DRIVERS LIST ERROR", err);
    }
});

/******* get all drivers here *******/
router.post("/", auth, async (req, res) => {
  log("here get list of all drivers");
  try {
    const drivers = await Driver.find();
    res.send(drivers)
  } catch (err) {
    log("GET DRIVERS LIST ERROR", err);
  }
});

/******* here get list of ready drivers *******/ 
router.post("/get-ready-drivers-list", auth, async (req, res) => {
  log("here get list of ready drivers");
    try {
      const drivers = await Driver.find({ready: true});
      res.send(drivers);
 
    } catch (err) {
      log("GET DRIVERS LIST ERROR", err);
    }
});
  
module.exports = router;