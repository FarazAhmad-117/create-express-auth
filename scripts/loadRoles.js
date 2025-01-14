require("dotenv").config();
const mongoose = require("mongoose");
const Role = require("../models/Role");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database connected");
};

const addReferenceRoles = async () => {
  const roles = [
    {
      name: "Admin",
      permissions: [
        { resource: "users", action: "create" },
        { resource: "users", action: "read" },
        { resource: "users", action: "update" },
        { resource: "users", action: "delete" },
        { resource: "products", action: "create" },
        { resource: "products", action: "read" },
        { resource: "products", action: "update" },
        { resource: "products", action: "delete" },
      ],
    },
    {
      name: "Editor",
      permissions: [
        { resource: "products", action: "create" },
        { resource: "products", action: "read" },
        { resource: "products", action: "update" },
      ],
    },
    {
      name: "Viewer",
      permissions: [
        { resource: "products", action: "read" },
        { resource: "users", action: "read" },
      ],
    },
  ];

  try {
    await Role.deleteMany();
    await Role.insertMany(roles);
    console.log("Reference roles added successfully");
  } catch (error) {
    console.error("Error adding roles:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
(async () => {
  await connectDB();
  await addReferenceRoles();
})();
