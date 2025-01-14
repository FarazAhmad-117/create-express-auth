require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const connectRoutes = require("./routes/connectRoutes");
const MongoStore = require("connect-mongo");
const app = express();

// Connect to MongoDB
connectDB();

// Applying sessions middleware to enable social sessions
app.use(
  session({
    secret: process.env.JWT_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Use your MongoDB URI
      ttl: 14 * 24 * 60 * 60, // Session expiration in seconds (14 days by default)
    }),
    cookie: {
      secure: false, // Set true if using HTTPS
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days in milliseconds
    },
  })
);

// Middleware
app.use(express.json());
app.use(passport.initialize());
require("./config/passport");

// Routes
connectRoutes(app);

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
app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT}. You can check documentation at http://localhost:${PORT}/api-docs`
  )
);
