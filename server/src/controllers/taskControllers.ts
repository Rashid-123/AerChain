import { Request, Response } from "express";
import { TaskModel } from "../models/taskModel.js";
import { TaskInput } from "../types/taskTypes.js";


// ----------- create task --------

export const createTask = async (req: Request, res: Response) => {
    try {
        const data: TaskInput = req.body;

        if (!data?.title || data?.title.trim() === "") {
            return res.status(400).json({
                error: "Title is required to create a task"
            });
        }

        const task = await TaskModel.create(data);

        return res.status(201).json({ message: "Task created successfully", task });
    } catch (err) {
        console.error("Create Task Error", err);
        return res.status(500).json({ error: "Failed to create task" })
    }
};

// ----------- Get all tasks ( with filter and search)
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { status, priority, query } = req.query;

    const filter: any = {};

    // ✅ Filters
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // ✅ Search (title + description)
    if (query) {
      filter.$text = { $search: query };
    }

    const tasks = await TaskModel
      .find(filter)
      .sort({ createdAt: -1 });

    return res.status(200).json(tasks);

  } catch (err) {
    console.error("Get Tasks Error:", err);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
};


// ------------- Get single task ------------------

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const task = await TaskModel.findById(req.params.id);

        if (!task) return res.status(404).json({ error: "Task not found" });

        return res.json(task);
    } catch (err) {
        console.error("Get Task Error :", err);
        return res.status(500).json({ error: "Failed to fetch task " });
    }
}

// ---------------- Update Task -----------------

export const updateTask = async (req: Request, res: Response) => {
    try {
        // console.log(req.body)
        // console.log(req.params.id);
        const updated = await TaskModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        // console.log(updated)
        if (!updated) return res.status(404).json({ error: "Task not found" });

        return res.json({ message: "Task updated successfully", task: updated });
    } catch (err) {
        console.error("Update Task Error :", err);
        return res.status(500).json({ error: "Failed to update task" });
    }
}


// ------------- Update only the task Status ( for drag and drop feature ) ---------------

export const updateTaskStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;

        if (!status) return res.json({ error: "Please provide status to update" })


        const updated = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        )

        if (!updated) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.json({ message: "Task status updated successfully", task: updated });
    } catch (err) {
        console.error("Status Update Error:", err);
        return res.status(500).json({ error: "Filed to updae status" });
    }
}


//---------------- Delete task ----------------------

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const deleted = await TaskModel.findByIdAndDelete(req.params.id);

        if (!deleted) return res.status(404).json({ error: "Task not found" });

        return res.json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error("Delete Task Error", err);
        return res.status(500).json({ error: "Failed to delete task" });
    }
}