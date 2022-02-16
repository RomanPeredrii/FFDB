const { Schema, model } = require("mongoose");
const prospect = new Schema({
  date: {
    type: Date,
    default: Date.now,
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
