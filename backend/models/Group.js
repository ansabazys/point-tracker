import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true,},
  point: { type: Number, required: true, default: 0},
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }]
});

export default mongoose.model("Group", GroupSchema);