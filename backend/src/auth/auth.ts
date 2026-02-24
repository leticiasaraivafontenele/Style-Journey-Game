import jwt, { SignOptions } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtConfig } from "../config/database.js";

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
    jwtConfig.accessSecretKey,
    { expiresIn: jwtConfig.accessTokenExpiry } as SignOptions
  );

  return token;
};

const generateRefreshToken = async (user: UserPayload): Promise<string> => {
  const token = jwt.sign(
    {
      username: user.username,
    },
    jwtConfig.refreshSecretKey,
    { expiresIn: jwtConfig.refreshTokenExpiry } as SignOptions
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
  
  jwt.verify(token, jwtConfig.accessSecretKey, async (err) => {
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
