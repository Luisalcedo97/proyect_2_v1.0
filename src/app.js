import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import methodOverride from "method-override";
import flash from "connect-flash";
import passport from "passport";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cors from "cors"; // Importar CORS

import { MONGODB_URI, PORT } from "./config.js";

import indexRoutes from "./routes/index.routes.js"; // Rutas para la aplicación web
import notesRoutes from "./routes/notes.routes.js"; // Rutas para la API
import userRoutes from "./routes/auth.routes.js"; // Rutas de autenticación
import "./config/passport.js";

// Inicializaciones
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuraciones
app.set("port", PORT);
app.set("views", join(__dirname, "views"));

// Configuración de Handlebars
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Añadir soporte para JSON
app.use(methodOverride("_method"));
app.use(cors()); // Habilitar CORS
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables Globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Rutas
app.use(indexRoutes); // Rutas para la aplicación web
app.use(userRoutes); // Rutas de autenticación
app.use("/api", notesRoutes); // Usar prefijo para la API

// Archivos estáticos
app.use(express.static(join(__dirname, "public")));

// Manejo de 404
app.use((req, res, next) => {
  return res.status(404).json({ message: "Not Found" }); // Respuesta en formato JSON
});

// Manejo de errores
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message }); // Respuesta en formato JSON
});

export default app;
