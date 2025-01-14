const auth = require("./auth");
const role = require("./role");

const connectRoutes = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/role", role);
};

module.exports = connectRoutes;
