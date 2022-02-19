const { Schema, model } = require("mongoose");
const vessel = new Schema({
  name: {
    type: String,
    required: true,
  },
  ATB: {
    type: String,
    required: true,
  },
  ETB: {
    type: String,
    required: true,
  }
});

module.exports = model("Vessel", vessel);