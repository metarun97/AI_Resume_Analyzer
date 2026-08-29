/* Imported elements */
import jwt from "jsonwebtoken";

export const authenticationExcess = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  // console.log(token);

  /* If token not found */
  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized:Token not found",
    })
  }

  try {
    /* Verify the token and valid user info */
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    /* Set decoded user value to the user */
    const user = decoded;

    /* Attact userInfo to req */
    req.user = user;

    /* Proceed to the next middleware and  */
    next();

  } catch (error) {
    res.status(401).json({
      message: "Unauthorized:Invalid accessToken",
    })
  }
}
