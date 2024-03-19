const express = require("express");
const router = express.Router();
const experiencia = require("../controllers/experiencia");
const catchAsync = require("../utilities/catchAsync");
const { isLoggedIn, validateExp } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(experiencia.index))
  .post(
    isLoggedIn,
    upload.array("logo"),
    validateExp,
    catchAsync(experiencia.crearExperiencia)
  );

router.get("/nueva", isLoggedIn, experiencia.renderNueva);

router
  .route("/:id")
  .get(catchAsync(experiencia.renderDetalles))
  .put(isLoggedIn, validateExp, catchAsync(experiencia.editarExperiencia))
  .delete(isLoggedIn, catchAsync(experiencia.eliminarExperiencia));

router.get("/:id/editar", isLoggedIn, catchAsync(experiencia.renderEditar));

module.exports = router;
