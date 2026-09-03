/* imported items */
import resumeModel from "../models/resume.model.js";
import { uploadResume } from "../services/storage.service.js";


export const uploadResumeController = async (req, res) => {

  try {
    const userId = req.user.id;
    const { title } = req.body;

    if (!title) {
      res.status(400).json({
        message: "Resume title is required",
      })
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF is required",
      })
    }

    const uploadedFile = await uploadResume(req?.file);


    const resume = await resumeModel.create({
      user: userId,
      title,
      originalFileName: req.file.originalname,
      fileUrl: uploadedFile.fileUrl,
      fileKey: uploadedFile.fileKey,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      status: "uploaded",
    });


    console.log(resume)

    // res.status(201).json({
    //   message: "Resume uploaded successfully",
    //   resume,
    // });

  } catch (error) {
    res.status(500).json({
      message: "Resume upload failed",
    });
  }
}
