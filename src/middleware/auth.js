export function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

export function hasRole(roleName) {
  return (req, res, next) => {
    const user = req.session.user;
    if (!user) return res.redirect("/login");

    const roles = user.roles || [];
    if (!roles.includes(roleName)) {
      return res.status(403).send("Accès refusé");
    }
    next();
  };
}
