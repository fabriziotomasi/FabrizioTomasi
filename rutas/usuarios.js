const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utilities/catchAsync");
const User = require("../models/user");
const usuarios = require("../controllers/usuarios");
const { storeReturnTo } = require("../middleware");

router
  .route("/registro")
  .get(usuarios.renderRegistro)
  .post(catchAsync(usuarios.registro));

router
  .route("/login")
  .get(usuarios.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
    usuarios.login
  );

router.get("/logout", usuarios.logout);

module.exports = router;
