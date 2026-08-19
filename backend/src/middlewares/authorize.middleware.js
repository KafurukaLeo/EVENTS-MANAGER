const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication is required",
      });
    }
    const userRole = (req.user.role || "").toLowerCase();
    const allowedRoles = roles.map(r => (r || "").toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }
    next();
  };
};
export default authorize;
