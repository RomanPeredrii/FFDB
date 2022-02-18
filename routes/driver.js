const log = console.log;
const { Router } = require("express");
const router = Router();
const Driver = require("../models/driver");
const auth = require("../middleware/auth");

router.post("/add-new", auth, async (req, res) => {
  /****** add new driver *******/ log("here add new driver", req.body);
  const driver = new Driver({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    passport: req.body.passport,
    DOB: req.body.DOB,
    vehicle: req.body.vehicle,
    trailer: req.body.trailer,
    carrier: req.body.carrier,
  });
  try {
    await driver.save();
    res.redirect("/drivers");
  } catch (error) {
    log("ADD NEW USER ERROR", error);
  }
});

router.delete("/:id/delete", auth, async (req, res) => {
  /****** delete user here *******/ log("here delete drivers", req.params);
  try {
    await Driver.findByIdAndDelete(req.params.id);
    return res.redirect("/drivers");
  } catch (err) {
    log("DELETE USER ERROR", err);
  }
});

router.post("/:id/edit", auth, async (req, res) => {
  /****** edit user here *******/ log("here edit driver", req.params, req.query);
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

router.post("/change-existing", auth, async (req, res) => {
  /****** change user record here *******/ log("change driver", req.body);
  const { _id } = req.body;
  delete req.body._id;
  try {
    await User.findOneAndUpdate({ _id }, req.body);
    res.redirect("/drivers");
  } catch (error) {
    log("EDIT USER ERROR", error);
  }
});

module.exports = router;