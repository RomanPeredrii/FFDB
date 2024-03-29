const { Schema, model } = require("mongoose");
const container = new Schema({
  number: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: false /** temp **/,
  },
  status: {
    type: String,
    required: false /** temp **/,
  },
  client: {
    type: String,
  },
  POL: {
    type: String,
  },
  POD: {
    type: String,
  },
  line: {
    type: String,
  },
  date: /** temp **/ {
    type: Date,
    required: true
  },
  vessel: {
    type: String,
    default: ''
  },
  // vessel: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Vessel"
  // },
  BL: {
    type: String,
  },
  FD: {
    type: String,
  },
  downtime: {
    type: Number,
  },
  // driver: {
  //   type: String
  // },
  driver: {
      type: Schema.Types.ObjectId,
      ref: "Driver"
    },
  // carrier: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Carrier"
  // },
  weight: {
    type: Number,
  },
  cargo: {
    type: String,
  },
  comments: {
    type: String,
  },
});

module.exports = model("Container", container);
