const ensureAdmin = (req, res, next) => {
  const isAuth = req.isAuthenticated();
  const isAdmin = req.user.role;
  if (isAuth && isAdmin === "admin") {
    // console.log(req.user);
    return next();
  }
  res
    .status(500)
    .json("unauthorized only admin is authorized for this action.");
};

module.exports = {
  ensureAdmin,
};
