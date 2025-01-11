const mongoose = require("mongoose");

const providerEnum = ["local", "google", "facebook", "github", "apple"];

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  avatar: { type: String },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  provider: { type: String, enum: providerEnum, default: "local" },
  providerId: { type: String },
  isVerified: { type: Boolean, default: false }, // Email verification
  verificationToken: { type: String }, // For email verification
});

module.exports = mongoose.model("User", UserSchema);
