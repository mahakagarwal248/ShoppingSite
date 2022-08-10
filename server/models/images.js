import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    img: {
      data: Buffer,
      contentType: String,
    },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("images", imageSchema);
