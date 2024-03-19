const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utilities/catchAsync");
const User = require("../models/user");
const { storeReturnTo } = require("../middleware");

//Desactivo el registro de usuarios porque no aplica.
// router.get("/registro", (req, res) => {
//   res.render("usuarios/registro");
// });

//router.post(
//   "/registro",
//   catchAsync(async (req, res, next) => {
//     try {
//       const { email, username, password } = req.body;
//       const user = new User({ email, username });
//       const registeredUser = await User.register(user, password);
//       req.login(registeredUser, (err) => {
//         if (err) return next(err);
//         req.flash("success", "Usuario registrado exitosamente!");
//         res.redirect("/");
//       });
//     } catch (e) {
//       req.flash("error", e.message);
//       res.redirect("registro");
//     }
//   })
// );

router.get("/login", (req, res) => {
  res.render("usuarios/login");
});

router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
  (req, res) => {
    req.flash("success", "Bienvenido");
    const redirectUrl = res.locals.returnTo || "/";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Sesión cerrada exitosamente.");
    res.redirect("/");
  });
});

module.exports = router;
