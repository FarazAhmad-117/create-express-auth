const authorizeRoles = (requiredRoles) => (req, res, next) => {
  const userRoles = req.user.roles.map((role) => role.name);
  const hasRequiredRole = requiredRoles.some((role) =>
    userRoles.includes(role)
  );
  if (!hasRequiredRole) return res.status(403).json({ message: "Forbidden" });
  next();
};

module.exports = authorizeRoles;
