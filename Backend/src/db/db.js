/* Import elements⬇️ */
import mongoose from "mongoose";


/* Function to connect Database */
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully!")
  } catch (error) {
    console.log("Error to connect database", error);
  }
}


/* Export elements⬇️ */
export default connectToDb;
