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
  vessel: {
    type: String,
  },
  BL: {
    type: String,
  },
  FD: {
    type: String,
  },
  driver: "" || {
    type: String,
  },
  weight: {
    type: String,
  },
  cargo: {
    type: String,
  },
  comments: {
    type: String,
  },
});

module.exports = model("Container", container);
