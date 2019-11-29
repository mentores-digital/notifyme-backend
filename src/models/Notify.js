const { Schema, model } = require("mongoose");

const NotifySchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    hour: {
      type: Date,
      required: true
    },
    receive: {
      type: Boolean,
      required: true
    },
    to: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model("Notify", NotifySchema);
