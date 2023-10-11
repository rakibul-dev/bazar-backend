const ensureAdmin = (req, res, next) => {
  const isAuth = req.isAuthenticated();

  if (isAuth && req.user.role === "admin") {
    return next();
  }
  res
    .status(500)
    .json("unauthorized only admin is authorized for this action.");
};

module.exports = {
  ensureAdmin,
};
