const log = console.log;
const { Router } = require("express");
const router = Router();
const Vessel = require("../models/vessel");
const auth = require("../middleware/auth");
const moment = require("moment");



router.get("/", auth, async (req, res) => {
    /******* get all drivers here *******/ log("here get list of all vessels");
    try {
      const vessels = await Vessel.find();
        res.render("vessels", {
        activeUser: req.session.user.name,
        place: "Vessels",
        title: "Vessels",
        isVessels: true,
        vessels
      });
    } catch (err) {
      log("GET VESSEL LIST ERROR", err);
    }
  });


module.exports = router;