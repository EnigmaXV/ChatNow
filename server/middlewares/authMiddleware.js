const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const token = req.cookies["auth-token"];

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Authentication token is missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Invalid authentication token" });
  }
};

module.exports = protect;
