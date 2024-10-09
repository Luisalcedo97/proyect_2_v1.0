import Note from "../models/Note.js";

// Crear una nueva nota
export const createNewNote = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Título y descripción son requeridos." });
  }

  // Comprobar que req.user existe
  /*if (!req.user) {
    return res.status(401).json({ message: "No autorizado" });
  }*/

  const newNote = new Note({ title, description });

  try {
    await newNote.save();
    res.status(201).json({ message: "Rutina agregada exitosamente", note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar la rutina", error: error.message });
  }
};

// Obtener todas las notas (sin autenticación)
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: "desc" }).lean(); // Obtener todas las notas sin restricción de usuario
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las notas", error: error.message });
  }
};

// Obtener una nota por ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).lean();
    if (!note) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la nota", error: error.message });
  }
};

// Actualizar una nota
export const updateNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Nota no encontrada o no autorizado" });
    }

    note.title = title || note.title; // Actualizar solo si se proporciona un nuevo valor
    note.description = description || note.description;
    await note.save();

    res.status(200).json({ message: "Rutina actualizada con éxito", note });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la nota", error: error.message });
  }
};

// Eliminar una nota
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Nota no encontrada o no autorizado" });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Rutina eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la nota", error: error.message });
  }
};
