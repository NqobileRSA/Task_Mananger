import Task from "../models/Task.model.js";

// app.get('api/v1/tasks') - get all the tasks
const getAllTask = async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// app.post('api/v1/tasks') - send a task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: error });
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

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res
        .status(404)
        .json({ message: `Task with ID : ${taskID} not found!` });
    }

    res.status(200).json({
      id: taskID,
      data: req.body,
      message: `Task with id : ${taskID} was edited!`,
    });
  } catch (error) {
    res.status(500).json({ message: error });
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
