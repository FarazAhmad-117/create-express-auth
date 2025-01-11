require("dotenv").config();
const express = require("express");
const passport = require("passport");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(passport.initialize());
require("./config/passport");

// Routes
app.use("/api/auth", authRoutes);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "Authentication API with multiple methods",
    },
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
