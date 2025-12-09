import {Router } from "express";

import {createTask , getTaskById , getAllTasks , updateTask , updateTaskStatus , deleteTask} from "../controllers/taskControllers.js";

const router = Router();


router.post("/", createTask);
router.get("/" , getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id",updateTask);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

console.log(router);

export default router;