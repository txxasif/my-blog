import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
