/* Import elements */
import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/* function for Register user */
export const registerUser = async (req, res) => {
  const { username, email, password, fullName: { firstName, lastName } } = req.body;

  /* Find user already exists in db check with{username,email} */
  const isUserAlreadyExists = await userModel.findOne({
    $or: [
      { username },
      { email },
    ]
  })
  /* If user exist return and not to proceed further */
  if (isUserAlreadyExists) {
    return res.status(401).json({
      message: "User already Exists",
    })
  }

  /* Make password hash for security */
  const hashPassword = await bcrypt.hash(password, 10);

  /* If not any user exist with given {username,email} then create a new user */
  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
    fullName: { firstName, lastName },
  })

  /* Give token to the user (use a fallback secret in tests) */
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'test_jwt_secret');

  /* Save token in cookie (only secure in production) */
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000  // 1day
  })

  /* Final response */
  res.status(201).json({
    message: "User Registered Successfully.",
    user: {
      username: user.username,
      email: user.email,
      fullName: user.fullName
    }
  })
}

/* function for Login user */
export const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  /* Check user by { username, email} to check it is available or not */
  const user = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  }).select("+password")

  /* If user not found*/
  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    })
  }

  /* Check user that available user has same password */
  const isMatched = await bcrypt.compare(password, user.password);

  /* If password not matched */
  if (!isMatched) {
    return res.status(401).json({
      message: "Invalid password.",
    })
  }

  /* If all of those found then give a token to user (fallback secret for tests) */
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'test_jwt_secret', { expiresIn: "1d" });

  /* Save token in the cookie */
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 //1day
  })
  /* Final response */
  res.status(200).json({
    message: "User loggedIn Succcessfully.",
    user: {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    }
  })
}

/* function for Me user */
export const meUser = async (req, res) => {
  res.status(200).json({
    message: "User fetched Successfully",
    user: req.user,
  })
}
