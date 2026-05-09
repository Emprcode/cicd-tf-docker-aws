"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Note {
  _id: string;
  title: string;
  completed: boolean;
};

const API_URL = "http://localhost:8000/notes";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");

  // GET notes
  const fetchNotes = async () => {
    const res = await axios.get(API_URL);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // CREATE note
  const createNote = async () => {
    if (!title) return;

    await axios.post(API_URL, { title });

    setTitle("");
    fetchNotes();
  };

  // DELETE note
  const deleteNote = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchNotes();
  };

  // TOGGLE completed
  const toggleNote = async (note: Note) => {
    await axios.put(`${API_URL}/${note._id}`, {
      title: note.title,
      completed: !note.completed,
    });

    fetchNotes();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Smart Notes SaaS</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note"
        />
        <button onClick={createNote}>Add</button>
      </div>

      <ul style={{ marginTop: "20px" }}>
        {notes.map((note) => (
          <li key={note._id} style={{ marginBottom: "10px" }}>
            <span
              onClick={() => toggleNote(note)}
              style={{
                cursor: "pointer",
                textDecoration: note.completed ? "line-through" : "none",
                marginRight: "10px",
              }}
            >
              {note.title}
            </span>

            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}