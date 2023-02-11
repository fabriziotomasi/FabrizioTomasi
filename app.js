const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
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

app.get("/experiencia", async (req, res) => {
    const exps = await Exp.find({});
    res.render("experiencia/index", { exps });
});

app.get("/experiencia/nueva", (req, res) => {
    res.render("experiencia/nueva");
});

app.post("/experiencia", async (req, res) => {
    const exp = new Exp(req.body.exp);
    await exp.save();
    res.redirect(`/experiencia/${exp._id}`);
});

app.get("/experiencia/:id", async (req, res) => {
    const exp = await Exp.findById(req.params.id);
    res.render("experiencia/detalles", { exp });
});

app.get("/experiencia/:id/editar", async (req, res) => {
    const exp = await Exp.findById(req.params.id);
    res.render("experiencia/editar", { exp });
});

app.put("/experiencia/:id", async (req, res) => {
    const { id } = req.params;
    const exp = await Exp.findByIdAndUpdate(id, { ...req.body.exp });
    res.redirect(`/experiencia/${exp._id}`);
});

app.delete("/experiencia/:id", async (req, res) => {
    const { id } = req.params;
    await Exp.findByIdAndDelete(id);
    res.redirect("/experiencia");
});

app.get("/contacto", (req, res) => {
    res.render("contacto/contacto");
});

app.use((req, res) => {
    res.status(404).send("Pa que tocás si no sabes? Rompiste Todo.");
})

app.listen("3000", () => {
    console.log("Serving on port 3000");
});