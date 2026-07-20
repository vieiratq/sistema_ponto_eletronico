function validaLogin(req, res, next) {
  if (req.session && req.session.user) {
    next();
    return;
  }

  res.redirect("/");
}
module.exports = validaLogin
export { }