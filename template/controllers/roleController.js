const Role = require("../models/Role");

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    res.status(500).json({ error: "Failed to create role" });
  }
};

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

// Get a single role by ID
exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch role" });
  }
};

// Update a role
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;
    const role = await Role.findByIdAndUpdate(
      id,
      { name, permissions },
      { new: true }
    );
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.status(200).json({ message: "Role updated successfully", role });
  } catch (error) {
    res.status(500).json({ error: "Failed to update role" });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndDelete(id);
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete role" });
  }
};
