import express from "express"
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/noteController";

const router = express.Router()

router.post("/", createNote)
router.get("/", getNotes)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)


export default router;