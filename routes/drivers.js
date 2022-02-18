const log = console.log;
const { Router } = require("express");
const router = Router();
const Driver = require("../models/driver");
const auth = require("../middleware/auth");



router.get("/", auth, async (req, res) => {
    /******* get all drivers here *******/ log("here get list of all drivers");
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


module.exports = router;