function validaLogin(req, res, next) {
  if (req.session.logado && req.session.empresa.id) {
    next();
    return;
  }

  res.redirect("/");
}
module.exports = validaLogin