const log = console.log;
const mongoose = require("mongoose");
const User = require("../models/user");
const { AdminUser } = require("../data");

module.exports = async function checkUser() {
  let user = await User.findOne();
  log("user", !!user);
  if (!user) {
    user = new User(AdminUser);
    await user.save();
  } else { return }
};
