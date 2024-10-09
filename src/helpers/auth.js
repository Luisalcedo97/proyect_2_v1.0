import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
 /* const token = req.headers.authorization?.split(" ")[1]; // Extraer el token del encabezado

  if (!token) {
    return res.status(401).json({ message: "Not Authorized." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Not Authorized." });
    }
    req.user = decoded; // Almacenar la información del usuario en la solicitud*/
    next();

};
