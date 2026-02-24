import { Request, Response } from "express";
import { userService } from "../service/userService.js";

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
  try {
    const userData = await userService.register(req.body);

    return res.status(201).json({
      message: "User created successfully!",
      userData
    });
  } catch (error) {
    if (error instanceof Error && error.message === "USER_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "User already exists!"
      });
    }
    
    console.error("Error in registerController:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const loginController = async(req: Request<{}, {}, LoginBody>, res: Response): Promise<Response> => {
  const { username, password } = req.body;
  
  try {
    const loginResult = await userService.login(username, password);

    res.cookie("refreshToken", loginResult.refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({
      message: "Login successful!",
      userData: {
        username: loginResult.user.username,
        accessToken: loginResult.accessToken,
        refreshToken: loginResult.refreshToken
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "USER_NOT_FOUND") {
        return res.status(404).json({
          message: "User not found!"
        });
      }
      if (error.message === "INVALID_PASSWORD") {
        return res.status(401).json({
          message: "Invalid password!"
        });
      }
    }
    
    console.error("Error in loginController:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const refreshController = async(req: Request, res: Response): Promise<Response> => {
  const refreshToken = req.cookies.refreshToken;

  try {
    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized!"
      });
    }

    const accessToken = await userService.refreshToken(refreshToken);
    
    return res.status(200).json({
      message: "Token refreshed!",
      accessToken
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "USER_NOT_FOUND") {
        return res.status(404).json({
          message: "User not found!"
        });
      }
      if (error.message === "INVALID_TOKEN") {
        return res.status(403).json({
          message: "Invalid token!"
        });
      }
    }
    
    console.error("Error in refreshController:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const logoutController = async(req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized!"
      });
    }

    await userService.logout(refreshToken);
    
    res.clearCookie("refreshToken");
    return res.status(200).json({
      message: "Logged out successfully!"
    });
  } catch (error) {
    console.error("Error in logoutController:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
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
