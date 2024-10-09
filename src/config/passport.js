import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js"; // Asegúrate de que la ruta sea correcta

// Estrategia Local
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Campo que se usará como nombre de usuario
    },
    async (email, password, done) => {
      try {
        // Buscar el usuario por correo electrónico
        const user = await User.findOne({ email: email });
        
        // Si no se encuentra el usuario
        if (!user) {
          return done(null, false, { message: "No se encontró usuario." });
        }

        // Coincidir la contraseña
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Contraseña incorrecta." });
        }

        // Autenticación exitosa
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialización de usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialización de usuario
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
