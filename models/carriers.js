const { Schema, model } = require("mongoose");
const carrier = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false /** temp **/,
  },
  drivers: [
    {
      containerId: {
        type: Schema.Types.ObjectId,
        ref: "Container",
        required: true,
      },
    },
  ],
});

module.exports = model("Carrier", carrier);