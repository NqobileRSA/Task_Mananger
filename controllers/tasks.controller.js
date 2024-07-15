import Task from "../models/Task.model.js";

// app.get('api/v1/tasks') - get all the tasks
const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// app.post('api/v1/tasks') - send a task
const createTask = async (req, res) => {
  try {
    console.log("Received task data:", req.body);
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      console.error("Validation error:", messages);
      return res.status(400).json({ message: messages.join(", ") });
    }
    console.error("Error creating task:", error);
    res.status(500).json({ message: error.message });
  }
};

// app.get('api/v1/tasks/:id') - get a task
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return res
        .status(404)
        .json({ message: `Task with ID : ${taskID} not found!` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// app.patch('api/v1/tasks/:id') - update a task
const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    console.log("Updating task with ID:", taskID);
    console.log("Update data:", req.body);

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      console.log("Task not found");
      return res
        .status(404)
        .json({ message: `Task with ID: ${taskID} not found!` });
    }

    console.log("Task updated:", task);
    res.status(200).json({ task }); // Send the updated task object directly
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: error.message });
  }
};

// app.delete('api/v1/tasks/:id') - delete a task
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete({ _id: taskID });

    if (!task) {
      return res
        .status(404)
        .json({ message: `Task with ID : ${taskID} not found!` });
    }

    res
      .status(200)
      .json({ task, message: `Task with name : "${task.name}" was deleted!` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { getAllTask, getTask, createTask, updateTask, deleteTask };
