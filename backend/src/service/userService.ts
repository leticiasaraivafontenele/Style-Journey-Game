import bcrypt from "bcryptjs";
import { userRepository } from "../repository/userRepository.js";
import { UserInstance } from "../model/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../auth/auth.js";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  avatarId?: number;
}

interface LoginResult {
  user: {
    username: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

export class UserService {
  async register(userData: RegisterData): Promise<{ username: string; email: string }> {
    const existingUser = await userRepository.existsByUsername(userData.username);
    
    if (existingUser) {
      throw new Error("USER_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = await userRepository.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      avatarId: userData.avatarId,
    });

    return {
      username: user.username,
      email: user.email,
    };
  }

  async login(username: string, password: string): Promise<LoginResult> {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      throw new Error("INVALID_PASSWORD");
    }

    const accessToken = await generateAccessToken(user.dataValues);
    const refreshToken = await generateRefreshToken(user.dataValues);

    await userRepository.update(user, { refreshToken });

    return {
      user: {
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const jwt = require("jsonwebtoken");
      const { jwtConfig } = require("../config/database.js");
      
      jwt.verify(refreshToken, jwtConfig.refreshSecretKey, async (err: any) => {
        if (err) {
          reject(new Error("INVALID_TOKEN"));
          return;
        }

        try {
          const user = await userRepository.findByRefreshToken(refreshToken);

          if (!user) {
            reject(new Error("USER_NOT_FOUND"));
            return;
          }

          const accessToken = await generateAccessToken(user.dataValues);
          resolve(accessToken);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async logout(refreshToken: string): Promise<void> {
    const user = await userRepository.findByRefreshToken(refreshToken);

    if (user) {
      await userRepository.update(user, { refreshToken: null });
    }
  }

  async getUserByRefreshToken(refreshToken: string): Promise<UserInstance | null> {
    return await userRepository.findByRefreshToken(refreshToken);
  }
}

export const userService = new UserService();
