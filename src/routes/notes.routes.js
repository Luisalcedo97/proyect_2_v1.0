import { Router } from "express";
import {
  createNewNote,
  updateNote,
  deleteNote,
  getAllNotes,  // Asegúrate de que esta función esté importada
  getNoteById,  // Asegúrate de que esta función esté importada
} from "../controllers/notes.controller.js";
// import { isAuthenticated } from "../helpers/auth.js"; // Comentar esta línea

const router = Router();

// Crear una nueva nota
router.post("/notes", createNewNote); // Comentar isAuthenticated

// Obtener todas las notas
router.get("/notes", /*isAuthenticated,*/ getAllNotes); // Comentar isAuthenticated

// Obtener una nota por ID
router.get("/notes/:id", /*isAuthenticated,*/ getNoteById); // Comentar isAuthenticated

// Editar nota
router.put("/notes/:id", updateNote); // Comentar isAuthenticated

// Eliminar nota
router.delete("/notes/:id", deleteNote); // Comentar isAuthenticated

export default router;
