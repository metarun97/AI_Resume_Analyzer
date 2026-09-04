/* Import elements */
import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


/* Controller for Register user */
export const registerUser = async (req, res) => {
  try {
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

    /* Give accessToken to the user (use a fallback secret in tests) */
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);

    /* Give refreshToken to the user (use a fallback secret in tests) */
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);

    /* Save accessToken in cookie (only secure in production) */
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: 15 * 60 * 1000  // 15 minutes
    })

    /* Save refreshToken in cookie (only secure in production) */
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000  // 1 week
    })

    /* Final response */
    res.status(201).json({
      message: "User Registered Successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName
      }
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
}

/* Controller for Login user */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  /* Check user by { username, email} to check it is available or not */
  const user = await userModel.findOne({
    $or: [
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


  /* Give accessToken to the user (use a fallback secret in tests) */
  const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);

  /* Give refreshToken to the user (use a fallback secret in tests) */
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);

  /* Save accessToken in cookie (only secure in production) */
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 15 * 60 * 1000  // 15 minutes
  })

  /* Save refreshToken in cookie (only secure in production) */
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000  // 1 week
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

/* Controller for Me user */
export const meUser = async (req, res) => {
  res.status(200).json({
    message: "User fetched Successfully",
    user: req.user,
  })
}

/* Controller for Logout user */
export const logoutUser = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    /* Clear both from cookies  */
    if (refreshToken) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      })
    }

    if (accessToken) {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
      })
    }

    // final response:-
    res.status(200).json({
      message: "User logout successfully.",
    })

  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

/* Controller for refreshAccessToken user */
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    /* if refresh token isn't in cookies */
    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token required",
      })
    }

    /* Verify refreshToken from the cookies */
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    /* Assigned new accessToken and defined it's user's id  with time */
    const newAccessToken = jwt.sign({
      id: decoded.id
    },
      process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" }
    )

    /* Save accessToken in the cookies */
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: 15 * 60 * 1000  // 15 minutes
    })

    /* Final response */
    res.status(200).json({
      message: "Access token refreshed successfully",
    })


  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
