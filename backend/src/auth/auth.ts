import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
  username: string;
  email?: string;
  id?: number;
}

const generateAccessToken = async (user: UserPayload): Promise<string> => {
  const token = jwt.sign(
    {
      username: user.username,
    },
    "access_secret_key",
    { expiresIn: "15min" }
  );

  return token;
};

const generateRefreshToken = async (user: UserPayload): Promise<string> => {
  const token = jwt.sign(
    {
      username: user.username,
    },
    "refresh_secret_key",
    { expiresIn: "7d" }
  );

  return token;
};

const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers["authorization"]?.split(" ")[1];
  
  if (!token) {
    res.status(401).json({
      message: "Unauthorized!"
    });
    return;
  }
  
  jwt.verify(token, "access_secret_key", async (err) => {
    if (err) {
      res.status(403).json({
        message: "Invalid token!"
      });
      return;
    }
    next();
  });
};

export { generateAccessToken, generateRefreshToken, authenticateToken };
