import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
      maxlength: [200, "Name cannot be more that 200 characters"],
      minlength: [5, "Name cannot be 5 characters"],
    },
    completed: { type: { type: Boolean, default: false } },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
