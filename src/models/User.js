const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    token: String,
    notification: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notify"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model("User", UserSchema);
