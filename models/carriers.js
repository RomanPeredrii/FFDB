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
      driverId: {
        type: Schema.Types.ObjectId,
        ref: "Driver",
        required: true,
      },
    },
  ],
});

module.exports = model("Carrier", carrier);