import express from "express";
import routes from "../routes";
import {
  postregisterView
} from "../controllers/videoController";


const apiRouter = express.Router();


apiRouter.post(routes.registerView, postregisterView); //post를 쓰는 이유는 데이터베이스를 수정하기 때문이다

export default apiRouter;