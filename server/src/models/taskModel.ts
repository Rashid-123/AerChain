import mongoose, { Schema, Document } from "mongoose";
import { TaskPriority, TaskStatus, TaskDocument } from "../types/taskTypes.js";
import { title } from "process";

interface TaskDB extends Document, TaskDocument { }

const TaskSchema = new Schema<TaskDB>({
    title: { type: String, require: true },
    description: { type: String },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Done"],
        default: "To Do",
    },
    dueDate: { type: Date, default: null }
},
    { timestamps: true }
);

TaskSchema.index({ title: "text", description: "text" });

export const TaskModel = mongoose.model<TaskDB> ("Task", TaskSchema);
