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
  },
  // containers: [
  //   {
  //     containerId: {
  //       type: Schema.Types.ObjectId,
  //       ref: "Container",
  //       required: true,
  //     },
  //   },
  // ],
});

module.exports = model("Vessel", vessel);