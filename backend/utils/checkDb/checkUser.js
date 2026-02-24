import { User } from "../../db/dbconnetion.js";

export async function checkUserAlreadyExistsByUsername(username) {
    const exitUser = await User.findOne({ where: { username: username } });
    return {isExists: exitUser!= null, user: exitUser};
}

export async function checkUserAlreadyExistsByRefreshToken(refreshToken) {
    const exitUser = await User.findOne({ where: { refreshToken: refreshToken } });
    return {isExists: exitUser!= null, user: exitUser};
}