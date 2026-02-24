import { Request, Response } from "express";
import { User } from "../db/dbconnetion.js";
import bcrypt from "bcryptjs";
import { checkUserAlreadyExistsByRefreshToken, checkUserAlreadyExistsByUsername } from "../utils/checkDb/checkUser.js";
import { generateAccessToken, generateRefreshToken } from "../auth/auth.js";
import jwt from "jsonwebtoken";

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

interface LoginBody {
  username: string;
  password: string;
}

export const registerController = async(req: Request<{}, {}, RegisterBody>, res: Response): Promise<Response> => {
  const { username, password } = req.body;
  const existUser = await checkUserAlreadyExistsByUsername(username);
  if(existUser.isExists){
    return res.status(409).json({
      message: "User already exists!"
    });
  }

  const hashPass = await bcrypt.hash(password, 10);
  const user = await User!.create(
    {
      ...req.body,
      password: hashPass
    }
  )

  return res.status(201).json({
    message: "User created successfully!",
    userData: {
      username: user.username,
      email: user.email
    }
  });
};

export const loginController = async(req: Request<{}, {}, LoginBody>, res: Response): Promise<Response> => {
  const { username, password } = req.body;
  try{
    const existUser = await checkUserAlreadyExistsByUsername(username);
    if(existUser.isExists && existUser.user){
      const isValidPass = await bcrypt.compare(password, existUser.user.password);
      if(!isValidPass){
        return res.status(401).json({
          message: "Invalid password!"
        });
      } 

      const accessToken = await generateAccessToken(existUser.user.dataValues);
      const refreshToken = await generateRefreshToken(existUser.user.dataValues);

      existUser.user.update({refreshToken: refreshToken});
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      })

      return res.status(200).json({
        "message": "Login successful!",
        "userData": {
          "username": existUser.user.username,
          "accessToken": accessToken,
          "refreshToken": refreshToken
        }
      });
    }
    return res.status(404).json({
      message: "User not found!"
    });
  }catch(error){
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    }); 
  }
};

export const refreshController = async(req: Request, res: Response): Promise<Response> => {
  const refreshToken = req.cookies.refreshToken;

  try{
    if(!refreshToken){
      return res.status(401).json({
        message: "Unauthorized!"
      });
    }
    
    const {user} = await checkUserAlreadyExistsByRefreshToken(refreshToken);
    
    return new Promise((resolve) => {
      jwt.verify(refreshToken, "refresh_secret_key", async (err: jwt.VerifyErrors | null) => {
        if(err){
          resolve(res.status(403).json({
            message: "Invalid token!"
          }));
          return;
        }

        if(user){
          const token = await generateAccessToken(user.dataValues);
          resolve(res.status(200).json({
            "message": "Token refreshed!",
            "accessToken": token
          }));
          return;
        }
        
        resolve(res.status(404).json({
          message: "User not found!"
        }));
      });
    });

  }catch(error){
    return res.status(500).json({
      message: "Internal server error"
    });
  }

};

export const logoutController = async(req: Request, res: Response): Promise<Response> => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      return res.status(401).json({
        message: "Unauthorized!"
      });
    }
    const {isExists, user} = await checkUserAlreadyExistsByRefreshToken(refreshToken);
    if(isExists && user){
      user.update({refreshToken: null});
    }
    res.clearCookie("refreshToken");
    return res.status(200).json({
      message: "Logged out successfully!"
    });
};

export const profileController = async(req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    message: "User profile data",
    userData: {
      username: req.body.username,
      email: req.body.email,
    }
  });
};
