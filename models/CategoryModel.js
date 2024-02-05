import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    lowercase: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  task: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Task",
      default: null,
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
