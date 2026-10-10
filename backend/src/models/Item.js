import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required."],
      trim: true,
      maxlength: [120, "Item name must be 120 characters or fewer."],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Item", itemSchema);
