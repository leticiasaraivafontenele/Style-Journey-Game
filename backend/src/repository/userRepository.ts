import { User } from "../db/dbconnetion.js";
import { UserInstance } from "../model/userModel.js";

export class UserRepository {
  async findByUsername(username: string): Promise<UserInstance | null> {
    if (!User) {
      throw new Error("User model not initialized");
    }
    return await User.findOne({ where: { username } });
  }

  async findByRefreshToken(refreshToken: string): Promise<UserInstance | null> {
    if (!User) {
      throw new Error("User model not initialized");
    }
    return await User.findOne({ where: { refreshToken } });
  }

  async findById(id: number): Promise<UserInstance | null> {
    if (!User) {
      throw new Error("User model not initialized");
    }
    return await User.findByPk(id);
  }

  async create(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<UserInstance> {
    if (!User) {
      throw new Error("User model not initialized");
    }
    return await User.create(userData);
  }

  async update(user: UserInstance, data: Partial<{ refreshToken: string | null }>): Promise<UserInstance> {
    return await user.update(data);
  }

  async existsByUsername(username: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return user !== null;
  }

  async existsByRefreshToken(refreshToken: string): Promise<boolean> {
    const user = await this.findByRefreshToken(refreshToken);
    return user !== null;
  }
}

export const userRepository = new UserRepository();
