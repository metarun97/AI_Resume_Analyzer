/* Imported elements */
import jwt from "jsonwebtoken";

export const authenticationExcess = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token);

  /* If token not found */
  if (!token) {
    return res.status(401).json({
      message: "Unotherized:Token not found",
    })
  }

  try {
    /* Verify the token and valid user info */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* Set decoded user value to the user */
    const user = decoded;

    /* Attact userInfo to req */
    req.user = user;

    /* Proceed to the next middleware and  */
    next();

  } catch (error) {
    res.status(401).json({
      message: "Unotherized:Invalid token",
    })
  }
}
