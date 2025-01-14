const mongoose = require("mongoose");

const AuthProviderSchema = new mongoose.Schema({
  provider: { type: String, required: true }, // e.g., "google", "facebook", "github"
  providerId: { type: String, required: true }, // Unique ID from the provider
  email: { type: String }, // Email associated with the provider (optional)
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Only for local users
  avatar: { type: String },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  authProviders: [AuthProviderSchema], // Array of authentication providers
  isVerified: { type: Boolean, default: false }, // Email verification
  verificationToken: { type: String }, // For email verification
});

module.exports = mongoose.model("User", UserSchema);
