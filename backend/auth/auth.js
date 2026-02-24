import jwt from "jsonwebtoken";

const generateAccessToken = async (user) => {
  const token = jwt.sign(
    {
      username: user.username,
    },
    "access_secret_key",
    { expiresIn: "15min" }
  );

  return token;
};

const generateRefreshToken = async (user) => {
  const token = jwt.sign(
    {
      username: user.username,
    },
    "refresh_secret_key",
    { expiresIn: "7d" }
  );

  return token;
};

const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized!"
    });
  };
  jwt.verify(token, "access_secret_key", async (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token!"
      });
    }
    next();
  });
};

export { generateAccessToken, generateRefreshToken, authenticateToken };