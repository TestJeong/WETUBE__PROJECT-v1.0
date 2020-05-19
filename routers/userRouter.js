import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController";
import {
  onlyPrivate
} from "../middleware";

const userRouter = express.Router();


userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail); //routes에서 Detail부분을 다 함수로 지정을 해주었기 때문에 ()괄호를 적어야 한다

export default userRouter;