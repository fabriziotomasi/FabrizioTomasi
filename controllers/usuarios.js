const User = require("../models/user");

module.exports.renderRegistro = (req, res) => {
  res.render("usuarios/registro");
};

module.exports.registro = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Usuario registrado exitosamente!");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("registro");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("usuarios/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Bienvenido");
  const redirectUrl = res.locals.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Sesión cerrada exitosamente.");
    res.redirect("/");
  });
};
