// Framework para Node.js
const express = require("express");
// Modulo para trabajar con archivos y rutas de archivos
const path = require("path");
// Libreria de node.js para hacer consultas a una base de datos mongodb
const mongoose = require("mongoose");
// Herramienta para crear plantillas con ejs
const ejsMate = require("ejs-mate");
// Herramienta que nos permite usar Flash entre otras cosas
const session = require("express-session");
const flash = require("connect-flash");
// Middleware creado para gestionar errores con express
const ExpressError = require("./utilities/ExpressError");
// Modulo para enviar solicitudes HTTP PUT o DELETE aunque el cliente no lo soporte
const methodOverride = require("method-override");
// permite aplicar diferentes estrategias de autenticacion
const passport = require("passport");
//estrategia de autenticacion local de passport
const LocalStrategy = require("passport-local");
// require user model para usar con passport
const User = require("./models/user");

// Acceso a la informacion del archivo en Rutas
const usuarios = require("./rutas/usuarios");
const experiencia = require("./rutas/experiencia");

/* Conexion con mongodb */
mongoose.connect("mongodb://localhost:27017/fabrizio-tomasi");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

/*Ejecuta Express*/
const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  secret: "papanoelnoexiste",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

//serialize y deserialize es como almacenamos la informacion en la sesion y como extraemos la informacion respectivamente
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// usa el archivo de la carpeta rutas
app.use("/", usuarios);
app.use("/experiencia", experiencia);

// ruta de la pagina home
app.get("/", (req, res) => {
  res.render("home");
});

// ruta de la pagina de contacto
app.get("/contacto", (req, res) => {
  res.render("contacto/contacto");
});

// ruta de la pagina de habilidades
app.get("/habilidades", (req, res) => {
  res.render("habilidades/habilidades");
});

// esto es para que si la ruta ingresada no es ninguna de las de arriba, creamoes el error de express con 404 y el mensaje y lo pasamos
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// si hubo un error, lo agarramos y mostramos la pagina de error con el statusCode y el message que corresponda
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, algo salió mal :(";
  res.status(statusCode).render("error", { err });
});

app.listen("3000", () => {
  console.log("Serving on port 3000");
});
