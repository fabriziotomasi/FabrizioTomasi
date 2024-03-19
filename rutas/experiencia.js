const express = require("express");
const router = express.Router();
// Modulo para validacion de datos, formatos, etc.
const Joi = require("joi");
// Destructura expSchema puntualmente del schemas.js(porque despues puede haber muchos), para usar en validateExp
const { expSchema } = require("../schemas.js");
// Middleware que creamos para verificar si un usuario tiene una sesion ya iniciada.
const { isLoggedIn } = require("../middleware");
// Middleware para atrapar los errores en las funciones async y pasarlos a next.
const catchAsync = require("../utilities/catchAsync");
// Middleware creado para gestionar errores con express
const ExpressError = require("../utilities/ExpressError");
// Mongoose model de experiencia laboral
const Exp = require("../models/exp");

/* Funcion para validad solicitudes segun las condiciones especificadas con Joi en schema.js */
const validateExp = (req, res, next) => {
  const { error } = expSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

router.get(
  "/",
  catchAsync(async (req, res) => {
    const exps = await Exp.find({});
    res.render("experiencia/index", { exps });
  })
);

router.get("/nueva", isLoggedIn, (req, res) => {
  res.render("experiencia/nueva");
});

router.post(
  "/",
  isLoggedIn,
  validateExp,
  catchAsync(async (req, res, next) => {
    const exp = new Exp(req.body.exp);
    await exp.save();
    req.flash("success", "Experiencia laboral agregada exitosamente.");
    res.redirect(`/experiencia/${exp._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const exp = await Exp.findById(req.params.id);
    if (!exp) {
      req.flash("error", "Experiencia laboral no encontrada");
      return res.redirect("/experiencia");
    }
    res.render("experiencia/detalles", { exp });
  })
);

router.get(
  "/:id/editar",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const exp = await Exp.findById(req.params.id);
    if (!exp) {
      req.flash("error", "Experiencia laboral no encontrada");
      return res.redirect("/experiencia");
    }
    res.render("experiencia/editar", { exp });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  validateExp,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const exp = await Exp.findByIdAndUpdate(id, { ...req.body.exp });
    req.flash("success", "Experiencia laboral actualizada exitosamente.");
    res.redirect(`/experiencia/${exp._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Exp.findByIdAndDelete(id);
    req.flash("success", "Experiencia laboral eliminada exitosamente.");
    res.redirect("/experiencia");
  })
);

module.exports = router;
