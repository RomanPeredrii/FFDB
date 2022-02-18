const { Schema, model } = require("mongoose");
const carrier = new Schema({
  name: {
    type: String,
    required: true,
  },
  TIR: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: false /** temp **/,
  }
});

module.exports = model("Carrier", carrier);