// Framework para Node.js
const express = require("express");
// Modulo para trabajar con archivos y rutas de archivos
const path = require("path");
// Libreria de node.js para hacer consultas a una base de datos mongodb
const mongoose = require("mongoose");
// Herramienta para crear plantillas con ejs
const ejsMate = require("ejs-mate");
// Modulo para validacion de datos, formatos, etc.
const Joi = require("joi");
// Destructuramos expSchema puntualmente de schemas.js(porque despues puede haber muchos), para usar en validateExp
const { expSchema } = require("./schemas.js");
// Middleware que escribimos para agarrar los errores en las funciones asincronas y pasarlos a next 
const catchAsync = require("./utilities/catchAsync");
// Middleware que escribimos nosotros para gestion de errores con express
const ExpressError = require("./utilities/ExpressError");
// Modulo que nos permite enviar solicitudes HTTP PUT o DELETE aunque el cliente no lo soporte
const methodOverride = require("method-override");
// Mongoose model
const Exp = require("./models/exp");

mongoose.connect("mongodb://localhost:27017/fabrizio-tomasi");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const validateExp = (req, res, next) => {
    const { error } = expSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg)
    } else {
        next();
    }
}

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/experiencia", catchAsync(async (req, res) => {
    const exps = await Exp.find({});
    res.render("experiencia/index", { exps });
}));

app.get("/experiencia/nueva", (req, res) => {
    res.render("experiencia/nueva");
});

app.post("/experiencia", validateExp, catchAsync(async (req, res, next) => {
    const exp = new Exp(req.body.exp);
    await exp.save();
    res.redirect(`/experiencia/${exp._id}`);
}));

app.get("/experiencia/:id", catchAsync(async (req, res) => {
    const exp = await Exp.findById(req.params.id);
    res.render("experiencia/detalles", { exp });
}));

app.get("/experiencia/:id/editar", catchAsync(async (req, res) => {
    const exp = await Exp.findById(req.params.id);
    res.render("experiencia/editar", { exp });
}));

app.put("/experiencia/:id", validateExp, catchAsync(async (req, res) => {
    const { id } = req.params;
    const exp = await Exp.findByIdAndUpdate(id, { ...req.body.exp });
    res.redirect(`/experiencia/${exp._id}`);
}));

app.delete("/experiencia/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Exp.findByIdAndDelete(id);
    res.redirect("/experiencia");
}));

app.get("/contacto", (req, res) => {
    res.render("contacto/contacto");
});

// esto es para que si la ruta ingresada no es ninguna de las de arriba, creamoes el error de express con 404 y el mensaje y lo pasamos 
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})

// si hubo un error, lo agarramos y mostramos la pagina de error con el statusCode y el message que corresponda
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh no, algo salió mal :("
    res.status(statusCode).render("error", { err });
});

app.listen("3000", () => {
    console.log("Serving on port 3000");
});