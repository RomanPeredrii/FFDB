const log = console.log;
const { Router } = require("express");
const router = Router();
const Driver = require("../models/driver");
const auth = require("../middleware/auth");
const { read } = require("xlsx");

/****** add new driver *******/ 
router.post("/add-new", auth, async (req, res) => {
log("here add new driver", req.body);
  const driver = new Driver({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    passport: req.body.passport,
    DOB: req.body.DOB,
    vehicle: req.body.vehicle,
    trailer: req.body.trailer,
    carrier: req.body.carrier,
    phone: req.body.phone,
  });
  try {
    await driver.save();
    res.redirect("/drivers");
  } catch (error) {
    log("ADD NEW DRIVER ERROR", error);
  }
});
 /****** delete driver here *******/ 
router.delete("/:id/delete", auth, async (req, res) => {
   log("here delete drivers", req.params);
  try {
    await Driver.findByIdAndDelete(req.params.id);
    return res.redirect("/drivers");
  } catch (err) {
    log("DELETE DRIVER ERROR", err);
  }
});
/****** get driver for edit here *******/ 
router.post("/:id/edit", auth, async (req, res) => {
log("get driver for edit here", req.params, req.query);
  try {
    const driver = await Driver.findById(req.params.id);
    if (!req.query.allow === "true") {
      return res.redirect("/drivers");
    } else {
      res.send({ driver });
    }
  } catch (err) {
    log("EDIT DRIVER PAGE ERROR", err);
  }
});

/****** change driver record here *******/ 
router.post("/change-existing", auth, async (req, res) => {
  log("change driver", req.body);
  const { _id } = req.body;
  delete req.body._id;
  try {
    await Driver.findOneAndUpdate({ _id }, req.body);
    res.redirect("/drivers");
  } catch (error) {
    log("EDIT DRIVER ERROR", error);
  }
});
/****** set driver rediness here *******/ 
router.post("/set-readiness", auth, async (req, res) => {
  log("change driver", req.body);
  const { _id } = req.body;
  delete req.body._id;
  let driver = new Object();
  try {
    driver = await Driver.findOneAndUpdate({ _id }, req.body);
    res.send(driver);
  } catch (error) {
    log("SET READINESS DRIVER ERROR", error);
  }
});

/****** off driver rediness here *******/ 
router.post("/off-readiness", auth, async (req, res) => {
  const findBy = { 
    // firstName: req.body.names.split(' ')[1],
    lastName: req.body.names.split(' ')[0].trim()
  };
  let driver = new Object();
  try {
    driver = await Driver.findOneAndUpdate(findBy, {ready : false}, {new: true});
    res.send(driver);
  } catch (error) {
    log("OFF READINESS DRIVER ERROR", error);
  }
});

module.exports = router;
