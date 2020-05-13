import express from "express";
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
  postJoin
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin); // 데이터 전송방식 get,post 방식이 있다.
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);


globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;