const log = console.log;
const { Router } = require("express");
const router = Router();
const Vessel = require("../models/vessel");
const auth = require("../middleware/auth");

router.post("/add-new", auth, async (req, res) => {
  /****** add new vessel *******/ log("here add new vessel", req.body);
  const vessel = new Vessel({
    ETB: req.body.ETB,
    ATB: req.body.ATB,
    name: req.body.name  
  });
  try {
    await vessel.save();
    res.redirect("/vessels");
  } catch (error) {
    log("ADD NEW VESSEL ERROR", error);
  }
});

router.delete("/:id/delete", auth, async (req, res) => {
  /****** delete vessel here *******/ log("here delete vessel", req.params);
  try {
    await Vessel.findByIdAndDelete(req.params.id);
    return res.redirect("/vessels");
  } catch (err) {
    log("DELETE VESSEL ERROR", err);
  }
});

router.post("/:id/edit", auth, async (req, res) => {
  /****** edit vessel here *******/ log("here edit vessel", req.params, req.query);
  try {
    const vessel = await Vessel.findById(req.params.id);
    if (!req.query.allow === "true") {
      return res.redirect("/Vessels");
    } else {
      res.send({ vessel });
    }
  } catch (err) {
    log("EDIT VESSEL PAGE ERROR", err);
  }
});

router.post("/change-existing", auth, async (req, res) => {
  /****** change vessel record here *******/ log("change vessel", req.body);
  const { _id } = req.body;
  delete req.body._id;
  try {
    await Vessel.findOneAndUpdate({ _id }, req.body);
    res.redirect("/vessels");
  } catch (error) {
    log("EDIT VESSEL ERROR", error);
  }
});

module.exports = router;
