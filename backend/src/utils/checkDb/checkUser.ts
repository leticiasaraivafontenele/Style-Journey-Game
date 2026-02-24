import { User } from "../../db/dbconnetion.js";
import { UserInstance } from "../../model/userModel.js";

interface CheckUserResult {
  isExists: boolean;
  user: UserInstance | null;
}

export async function checkUserAlreadyExistsByUsername(username: string): Promise<CheckUserResult> {
  const exitUser = await User!.findOne({ where: { username: username } });
  return {isExists: exitUser != null, user: exitUser};
}

export async function checkUserAlreadyExistsByRefreshToken(refreshToken: string): Promise<CheckUserResult> {
  const exitUser = await User!.findOne({ where: { refreshToken: refreshToken } });
  return {isExists: exitUser != null, user: exitUser};
}
