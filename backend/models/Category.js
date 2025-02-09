import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },

  position: { type: Number, enum: [1, 2, 3], required: true }, // 1st or 2nd place
  points: { type: Number, required: true },
});

export default mongoose.model("Category", CategorySchema);
