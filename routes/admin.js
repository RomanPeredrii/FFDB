const log = console.log;
const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

router.get("/", auth, async (req, res) => {
  /******* get all users here *******/ log("here get list of all users");
  try {
    const users = await User.find();
    res.render("admin", {
      activeUser: req.session.user.name,
      place: "USERS",
      title: "Admin Page",
      isAdmin: true,
      users,
    });
  } catch (err) {
    log("GET USERS LIST ERROR", err);
  }
});

router.delete("/:id/delete", auth, async (req, res) => {
  /****** delete user here *******/ log("here delete user", req.params);
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.redirect("/admin");
  } catch (err) {
    log("DELETE USER ERROR", err);
  }
});

router.post("/:id/edit", auth, async (req, res) => {
  /****** edit user here *******/ log("here edit user", req.params, req.query);
  try {
    const user = await User.findById(req.params.id);
    if (!req.query.allow === "true") {
      return res.redirect("/admin");
    } else {
      res.send({ user });
    }
  } catch (err) {
    log("EDIT USER PAGE ERROR", err);
  }
});

router.post("/add-new", auth, async (req, res) => {
  /****** add new user *******/ log("here add new user", req.body);
  if (req.body.password === req.body.confirmPassword) {
    const hashPaswd = await bcrypt.hash(req.body.password, 11);
    const user = new User({
      name: req.body.name,
      login: req.body.login,
      department: req.body.department,
      email: req.body.email,
      password: hashPaswd,
    });
    try {
      await user.save();
      res.redirect("/admin");
    } catch (error) {
      log("ADD NEW USER ERROR", error);
    }
  } else {
    res.send("confirm password error"); // doesnt resive on front!!!!!!!
  }
});

router.post("/change-existing", auth, async (req, res) => {
  /****** change user record here *******/ log("change user", req.body);
  if (req.body.password === req.body.confirmPassword) {
    const hashPaswd = await bcrypt.hash(req.body.password, 11);
    req.body.password = hashPaswd;
    const { _id } = req.body;
    delete req.body._id;
    try {
      await User.findOneAndUpdate({ _id }, req.body);
      res.redirect("/admin");
    } catch (error) {
      log("EDIT USER ERROR", error);
    }
  } else {
    res.send("confirm password error"); // doesnt resive on front!!!!!!!
  }
});

module.exports = router;
