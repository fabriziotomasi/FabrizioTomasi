const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utilities/catchAsync");
const ExpressError = require("./utilities/ExpressError");
const methodOverride = require("method-override");
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

app.post("/experiencia", catchAsync(async (req, res, next) => {
    if (!req.body.exp) throw new ExpressError(400, "Nop, te faltó algo o algo salió mal.")
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

app.put("/experiencia/:id", catchAsync(async (req, res) => {
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

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Algo salió mal :(" } = err;
    res.status(statusCode).send(message);
});

app.listen("3000", () => {
    console.log("Serving on port 3000");
});