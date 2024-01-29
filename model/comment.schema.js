import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    body: {
      type: String,
    },

    name: {
      type: String,
    },
    email: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
