import express from "express";
import morgan from "morgan"; // log알려주는 미들웨어
import helmet from "helmet"; //보안을 위한 미들웨어
import cookieParser from "cookie-parser"; //요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어 입니다
import bodyParser from "body-parser"; //post로 요청된 body를 쉽게 추출할 수 있는 모듈이다, node.js의 post요청 데이터를 추출할 수 있도록 만들어 주는 미들웨어이다
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import {
  localsMiddleware
} from "./middleware";


const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")) // 디렉토리(폴더) 안의 정적 파일을 제공해준다.
// /uploads로 가면 uploads라는 디렉토리(폴더)안으로 들어간다
app.use("/static", express.static("static"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;

// 미들웨어 함수를 사용할때 .use를 이용gka