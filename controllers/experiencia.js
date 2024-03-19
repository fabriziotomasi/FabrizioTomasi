const Exp = require("../models/exp");

module.exports.index = async (req, res) => {
  const exps = await Exp.find({});
  res.render("experiencia/index", { exps });
};

module.exports.renderNueva = (req, res) => {
  res.render("experiencia/nueva");
};

module.exports.crearExperiencia = async (req, res, next) => {
  const exp = new Exp(req.body.exp);
  exp.logo = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  await exp.save();
  console.log(exp);
  req.flash("success", "Experiencia laboral agregada exitosamente.");
  res.redirect(`/experiencia/${exp._id}`);
};

module.exports.renderDetalles = async (req, res) => {
  const exp = await Exp.findById(req.params.id);
  if (!exp) {
    req.flash("error", "Experiencia laboral no encontrada");
    return res.redirect("/experiencia");
  }
  res.render("experiencia/detalles", { exp });
};

module.exports.renderEditar = async (req, res) => {
  const exp = await Exp.findById(req.params.id);
  if (!exp) {
    req.flash("error", "Experiencia laboral no encontrada");
    return res.redirect("/experiencia");
  }
  res.render("experiencia/editar", { exp });
};

module.exports.editarExperiencia = async (req, res) => {
  const { id } = req.params;
  const exp = await Exp.findByIdAndUpdate(id, { ...req.body.exp });
  req.flash("success", "Experiencia laboral actualizada exitosamente.");
  res.redirect(`/experiencia/${exp._id}`);
};

module.exports.eliminarExperiencia = async (req, res) => {
  const { id } = req.params;
  await Exp.findByIdAndDelete(id);
  req.flash("success", "Experiencia laboral eliminada exitosamente.");
  res.redirect("/experiencia");
};
