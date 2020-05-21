import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  home,
  search
} from "../controllers/videoController";
import {
  getJoin,
  getLogin,
  postLogin,
  logout,
  postJoin,
  githubLogin,
  postGithubLogIn,
  getMe
} from "../controllers/userController";
import {
  onlyPublic,
  onlyPrivate
} from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin); // 데이터 전송방식 get,post 방식이 있다.
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);


globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.gitHub, githubLogin);
// 인증이 끝나면 사용자는 passport.js에 있는 callbackURL로 돌아온다

globalRouter.get(routes.githubcallback, passport.authenticate("github", {
  failureRedirect: "/login"
}), postGithubLogIn);

globalRouter.get(routes.me, getMe);

export default globalRouter;