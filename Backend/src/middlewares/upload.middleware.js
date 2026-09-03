import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {

    const extension = path.extname(file.originalname).toLowerCase();

    const allowedMimeTypes = [
      "application/pdf",
      "application/octet-stream",
    ];

    if (
      !allowedMimeTypes.includes(file.mimetype) ||
      extension !== ".pdf"
    ) {
      return cb(new Error("Only PDF files are allowed"));
    }

    cb(null, true);
  },
});
