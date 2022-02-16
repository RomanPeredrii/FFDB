const log = console.log;
const { Router } = require("express");
const router = Router();
const Container = require("../models/container");
const auth = require("../middleware/auth");

router.delete("/:id/delete", auth, async (req, res) => {
  /****** delete container here *******/ log(
    "here delete container",
    req.params
  );
  try {
    await Container.findByIdAndDelete(req.params.id);
    return res.redirect("/containers");
  } catch (error) {
    log("DELETE CONTAINER ERROR", error);
  }
});

router.get("/:id/edit", auth, async (req, res) => {
  /****** edit container here *******/ log(
    "here edit container",
    req.params,
    req.query
  );
  try {
    const container = await Container.findById(req.params.id);
    if (!req.query.allow === "true") {
      return res.redirect("/containers");
    } else {
      res.render("editContainer", {
        activeUser: req.session.user.name,
        title: container.number,
        IsEdit: true,
        place: "Edit container information",
        container,
      });
    }
  } catch (error) {
    log("EDIT CONTAINER PAGE ERROR", error);
  }
});

router.get("/:id", auth, async (req, res) => {
  /****** get full container information here *******/ log(
    "GET FULL CONTAINER PARAMS",
    req.params.id
  );
  try {
    const container = await Container.findById(req.params.id);
    res.render("container", {
      activeUser: req.session.user.name,
      layout: "empty",
      title: container.number,
      isContainer: true,
      container,
    });
  } catch (error) {
    log("GET FULL CONTAINER PARAMS ERROR", error);
  }
});

router.post("/edit", auth, async (req, res) => {
  /******* change container information here *******/
  log("here change container information & containers page update");
  const { id } = req.body;
  delete req.body.id;
  try {
    await Container.findOneAndUpdate({ _id: id }, req.body);
    res.redirect("/containers");
  } catch (error) {
    log("EDIT CONTAINER ERROR", error);
  }
});

module.exports = router;
