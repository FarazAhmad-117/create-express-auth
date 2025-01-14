const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  resource: { type: String, required: true }, // e.g., "users", "products"
  action: { type: String, required: true }, // e.g., "create", "read", "update", "delete"
});

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [PermissionSchema], // Array of permissions
});

module.exports = mongoose.model("Role", RoleSchema);
