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
import {
  onlyPublic
} from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin); // 데이터 전송방식 get,post 방식이 있다.
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);


globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;