const log = console.log;
const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const { S_MAILER } = require('../data')
const email = require ('../emails/newuser')


const transporter = nodemailer.createTransport(S_MAILER);

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

router.post("/change-existing", auth, async (req, res) => {
  /****** change user record here *******/ log("change user", req.body);
  if (req.body.password === req.body.confirmPassword) {
    const hashPswd = await bcrypt.hash(req.body.password, 11);
    req.body.password = hashPswd;
    const { _id } = req.body;
    delete req.body._id;
    try {
      await User.findOneAndUpdate({ _id }, req.body);
      res.redirect("/admin");
    } catch (err) {
      log("EDIT USER ERROR", err);
    }
  } else {
    res.send("confirm password error"); // doesn't receive on front!!!!!!!
  }
});

router.post("/add-new", auth, async (req, res) => {
  /****** add new user *******/ log("here add new user", req.body);
  if (req.body.password === req.body.confirmPassword) {
    const hashPswd = await bcrypt.hash(req.body.password, 11);
    const user = new User({
      name: req.body.name,
      login: req.body.login,
      department: req.body.department,
      role: req.body.role,
      email: req.body.email,
      password: hashPswd, 
    });
    try {
      await user.save();
/****** get just saved user *******/
      const savedUser = await User.findOne({name : user.name});

      res.redirect("/admin");
/****** check connected SMTP server *******/
      transporter.verify(function (err, success) {
        if (err) {
          throw err;
        } else {
          log("SMTP server is ready");
        }
      });
/****** send new user email*******/
      transporter.sendMail(email(savedUser), 
        (err, data) => {
          if (err) {          
            log('email send eror:', err);
            throw err;
          } else {
            log('email is sent', data);
          }
      });

    } catch (err) {
      log("ADD NEW USER ERROR", err);
    }
  } else {
    res.send("confirm password error"); // doesn't receive on front!!!!!!!
  }
});

module.exports = router;
