const { Schema, model } = require("mongoose");
const date = require("../controllers/date");
const vessel = new Schema({
  name: {
    type: String,
    required: true,
  },
  ATB: {
    type: Date,
    required: true,
  },
  ETB: {
    type: Date,
    required: true,
  }
});

module.exports = model("Vessel", vessel);