const { Schema, model } = require("mongoose");
const prospect = new Schema({
  date: {
    type: Date,  /**String should be better**/
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  containers: [
    {
      
        type: Schema.Types.ObjectId,
        ref: "Container",
        required: true,
      
    },
  ],
});

module.exports = model("Prospect", prospect);
