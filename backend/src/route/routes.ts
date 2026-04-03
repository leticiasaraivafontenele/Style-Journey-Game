import { Router } from "express";
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
  profileController,
  getUserController,
  updateUserController,
  deleteUserController
} from "../controller/userController.js";
import {
  saveLevelController,
  getLevelsByUserController,
  getLevelByUserAndLevelController,
  updateLevelController,
  deleteLevelController
} from "../controller/levelCompletedController.js";
import { authenticateToken } from "../auth/auth.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refreshtoken", refreshController);
router.post("/logout", logoutController);
router.post("/profile", authenticateToken, profileController);

router.get("/users/:id", authenticateToken, getUserController);
router.put("/users/:id", authenticateToken, updateUserController);
router.delete("/users/:id", authenticateToken, deleteUserController);

router.post("/levels", authenticateToken, saveLevelController);
router.get("/levels/user/:idUser", authenticateToken, getLevelsByUserController);
router.get("/levels/user/:idUser/level/:level", authenticateToken, getLevelByUserAndLevelController);
router.put("/levels/:id", authenticateToken, updateLevelController);
router.delete("/levels/:id", authenticateToken, deleteLevelController);

export default router;
