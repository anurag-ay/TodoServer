import Task from "../models/TaskModel.js";
import Category from "../models/CategoryModel.js";
import User from "../models/UserModel.js";

// add Task
export const addTaskController = async (req, res) => {
  const { title, userId, categoryId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).send("User with this Id is not Found");
  const category = await Category.findById(categoryId);
  if (!category)
    return res.status(404).send("Category with this Id is not Found");

  let task = new Task({
    title,
    user: userId,
    category: categoryId,
  });

  const savedTask = await task.save();

  await Category.updateOne(
    { _id: categoryId, user: userId },
    {
      $push: { task: savedTask._id },
    }
  );

  res.status(200).send(savedTask);
};

// get  All Task
export const getAllTaskController = async (req, res) => {
  const { userId } = req.params;
  const tasks = await Task.find({ user: userId });

  res.status(200).send(tasks);
};

// get Task by id
export const getTaskByIdController = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);
  res.status(200).send(task);
};

// Update Task
export const updateTaskController = async (req, res) => {
  const { _id, title, user, note, isDone, isImportant, category } = req.body;

  const updateTask = {
    title,
    user,
    note,
    isDone,
    isImportant,
    category,
  };

  const task = await Task.findOneAndUpdate({ _id: _id }, updateTask, {
    new: true,
  });

  res.status(200).send(task);
};

// Delete Task
export const deleteTaskController = async (req, res) => {
  const { userId, categoryId, taskId } = req.params;

  let task = await Task.findOneAndDelete(
    { user: userId, _id: taskId },
    { new: true }
  );

  if (!task) return res.send("Task already deleted");

  await Category.updateOne(
    { _id: categoryId, user: userId },
    {
      $pull: { task: taskId },
    }
  );

  res.status(200).send(task);
};
