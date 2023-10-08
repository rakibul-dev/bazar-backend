const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    return next();
  }
  res
    .status(500)
    .json("unauthorized for this action authorization is required.");
};

module.exports = {
  ensureAuthenticated,
};
