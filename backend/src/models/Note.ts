import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
    title: string;
    completed: boolean;
    createdAt: Date;
}

const noteSchema = new Schema<INote>(
    {
        title: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model<INote>("Note", noteSchema);

export default Note;