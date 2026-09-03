/* Imported items */
import ImageKit from "imagekit";



/* ImageKit credenti */
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT_KEY,
})

/* Upload resume by ImageKit */
export const uploadResume = async (file) => {
  try {
    const result = await imagekit.upload({
      file: file.buffer.toString("base64"),
      fileName: file.originalname,
      folder: "/resumes",
    })
    return {
      fileUrl: result.url,
      fileKey: result.fileId,
    }
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw new Error("Resume upload failed");
  }
}
