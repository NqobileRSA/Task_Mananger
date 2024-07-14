import express from "express";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

// middleware
app.use(express.json());

// routes

// app.get('api/v1/tasks') - get all the tasks
app.use("/api/v1/tasks", taskRoutes);
// app.get('api/v1/tasks/:id') - get a task

// app.post('api/v1/tasks') - send a task
// app.patch('api/v1/tasks/:id') - update a task
// app.delete('api/v1/tasks/:id') - delete a task

const port = 3000;

app.listen(port, console.log(`Server running at port ${port}`));
