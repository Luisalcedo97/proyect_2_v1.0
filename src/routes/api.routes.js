import { Router } from "express";
import {
	createNewNote,
	getAllNotes,
	getNoteById,
	updateNote,
	deleteNote,
} from "../controllers/notes.controller.js";
//import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// Crear una nueva nota
router.post("/", /*isAuthenticated,*/ createNewNote);

// Obtener todas las notas
router.get("/", /*isAuthenticated,*/ getAllNotes);

// Obtener una nota por ID
//router.get("/:id", isAuthenticated, getNoteById);

// Actualizar una nota
router.put("/:id", /*isAuthenticated,*/ updateNote);

// Eliminar una nota
router.delete("/:id", /*isAuthenticated,*/ deleteNote);

export default router;
