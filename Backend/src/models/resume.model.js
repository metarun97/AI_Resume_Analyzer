/* Imported items */
import mongoose from "mongoose";


/* resumeSchema created */
const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true
  },

  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },

  originalFileName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },

  fileUrl: {
    type: String,
    required: true,
    trim: true,
  },

  fileKey: {
    type: String,
    required: true,
    trim: true,
  },

  fileSize: {
    type: Number,
    required: true,
    min: 1,
  },

  mimeType: {
    type: String,
    required: true,
    enum: ["application/pdf"],
  },

  status: {
    type: String,
    enum: ["uploaded", "processing", "parsed", "analyzed", "failed"],
    default: "uploaded",
    index: true,
  },
})

/* resumeModel created */
const resumeModel = mongoose.model("resume", resumeSchema);

export default resumeModel;
