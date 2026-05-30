/* Import elements */
import mongoose from "mongoose";

/* userSchema created */
const userSchema = new mongoose.Schema({

  /* Email Field */
  username: {
    type: String,
    required: true,
    unique: true,
  },

  /* Email Field */
  email: {
    type: String,
    required: true,
    unique: true,
  },

  /* Email Field */
  password: {
    type: String,
    required: true,
  },

    /* Fullname Field */
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  }
});

/* userModel created */
const userModel = mongoose.model("user", userSchema);

/* Export elements */
export default userModel;
