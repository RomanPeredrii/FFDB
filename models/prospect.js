const { Schema, model } = require("mongoose");
const prospect = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  containers: [
    {
      containerId: {
        type: Schema.Types.ObjectId,
        ref: "Container",
        required: true,
      },
    },
  ],
});

module.exports = model("Prospect", prospect);
