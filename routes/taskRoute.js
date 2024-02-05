import express from "express";
import {
  addTaskController,
  deleteTaskController,
  getAllTaskController,
  getTaskByIdController,
  updateTaskController,
} from "../controller/taskController.js";
const router = express.Router();

router.post("/", addTaskController);
router.delete("/:userId/:categoryId/:taskId", deleteTaskController);
router.put("/", updateTaskController);
router.get("/:userId", getAllTaskController);
router.get("/:taskId", getTaskByIdController);

export default router;
