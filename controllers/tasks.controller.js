// get all tasks
const getAllTask = (req, res) => {
  res.send("All Tasks");
};

// create task
const createTask = (req, res) => {
  res.json(req.body);
};

const getTask = (req, res) => {
  res.json({ id: req.params.id });
};

// update task
const updateTask = (req, res) => {
  res.json({ id: req.params.id });
};

// delete task
const deleteTask = (req, res) => {
  res.send("delete task");
};

export { getAllTask, getTask, createTask, updateTask, deleteTask };
