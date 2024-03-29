const { Schema, model } = require("mongoose");
const driver = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  // carrier: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Carrier",
  //   required: true,
  // },
  DOB: {
    type: String,
    required: true,
  },
  carrier: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  comments: String,
  ready: {
    type: Boolean,
    default: false
  },
  lost: {
    type: Boolean,
    default: false
  }
});

module.exports = model("Driver", driver);
