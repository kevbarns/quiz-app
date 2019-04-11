const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {type: String, minlength: 2},
    email: {type: String, unique: true, match: /^.+@.+\..+$/},
    encryptedPassword: {type: String},
    role: {
      type: String,
      required: true,
      enum: ["normal", "admin"],
      default: "admin"
    },
    companyName: {type: String, minlength: 2},
    companyLogo: {type: String}
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
