/* imported items */
import resumeModel from "../models/resume.model.js";
import { uploadResume } from "../services/storage.service.js";
import crypto from 'crypto';

export const uploadResumeController = async (req, res) => {

  try {
    const userId = req.user.id;
    const { title } = req.body;

    // Title check for availability:-
    if (!title) {
      res.status(400).json({
        message: "Resume title is required",
      })
    }

    // File check for availability:-
    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF is required",
      })
    }

    // Give file a hashed value:-
    const fileHash = crypto
      .createHash("sha256")
      .update(req.file.buffer)
      .digest("hex")

    // Check to avoid duplicate upload:-
    const existingResume = await resumeModel.findOne({
      user: userId,
      fileHash,
    });

    if (existingResume) {
      return res.status(409).json({
        message: "This resume has already been uploaded",
      });
    }

    // Upload file on imagekit:-
    const uploadedFile = await uploadResume(req?.file);

    // Create a new resume:-
    const resume = await resumeModel.create({
      user: userId,
      title,
      originalFileName: req.file.originalname,
      fileUrl: uploadedFile.fileUrl,
      fileKey: uploadedFile.fileKey,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      fileHash: fileHash,
      status: "uploaded",
    });


    // Final response:-
    res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });

  } catch (error) {
    res.status(500).json({
      message: "Resume upload failed",
    });
  }
}
