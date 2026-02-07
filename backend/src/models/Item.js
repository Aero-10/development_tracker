import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { 
    type: String, 
    enum: ["Project", "Subject", "Placement", "Task"], 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ["Not Started", "In Progress", "Completed"], 
    default: "Not Started" 
  },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  tags: [String],
  links: [String],
  notes: [String],
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);
