import express from "express";
import connectDB from "./db/connect.js";
import taskRoutes from "./routes/tasks.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/v1/tasks", taskRoutes);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server running at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
