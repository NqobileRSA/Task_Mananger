import express from "express";
import {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} from "../controllers/tasks.controller.js";

const router = express.Router();

router.route("/").get(getAllTask).post(createTask);
router.route("/:id").patch(updateTask).delete(deleteTask).get(getTask);

export default router;
