const { Schema, model } = require("mongoose");
const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false /** temp **/,
  },
  department: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = model("User", user);
