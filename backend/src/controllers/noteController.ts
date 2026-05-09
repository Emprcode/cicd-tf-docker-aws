import { Request, Response } from "express";
import Note from "../models/Note";

export const createNote = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { title } = req.body;

        const note = await Note.create({
            title,
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create note",
        });
    }
};

export const getNotes = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const notes = await Note.find();

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch notes",
        });
    }
};

export const updateNote = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { title, completed } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title,
                completed,
            },
            {
                new: true,
            }
        );

        if (!updatedNote) {
            res.status(404).json({
                message: "Note not found",
            });

            return;
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update note",
        });
    }
};

export const deleteNote = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            res.status(404).json({
                message: "Note not found",
            });

            return;
        }

        res.status(200).json({
            message: "Note deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete note",
        });
    }
};