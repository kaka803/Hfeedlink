// models/Feedback.js
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // optional: adds createdAt and updatedAt
});

export const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
