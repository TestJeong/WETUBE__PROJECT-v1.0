import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  postChangePassword,
  getChangePassword
} from "../controllers/userController";
import {
  onlyPrivate,
  uploadAvatar
} from "../middleware";

const userRouter = express.Router();


userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail); //routes에서 Detail부분을 다 함수로 지정을 해주었기 때문에 ()괄호를 적어야 한다

export default userRouter;