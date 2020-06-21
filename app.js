import express from "express";
import morgan from "morgan"; // log알려주는 미들웨어
import helmet from "helmet"; //보안을 위한 미들웨어
import cookieParser from "cookie-parser"; //요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어 입니다
import passport from "passport";
import monggose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser"; //post로 요청된 body를 쉽게 추출할 수 있는 모듈이다, node.js의 post요청 데이터를 추출할 수 있도록 만들어 주는 미들웨어이다
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import apiRouter from "./routers/apiRouter";
import {
  localsMiddleware
} from "./middleware";
import "./passport";


const app = express();

const CokieStore = MongoStore(session)

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

app.use(session({
  secret: process.env.COOKIE_PWD,
  resave: true,
  saveUninitialized: false,
  store: new CokieStore({
    mongooseConnection: monggose.connection
  })
})); // session은 쿠키를 해독하여 실제 id가 되는 것이다 예를 들어 숫자 1 같은 것
app.use(passport.initialize());
app.use(passport.session());
//passport를 통해서 session을 이용, 즉 session이 가진 쿠키를 이용한다는걸 의미
// 그리고 그 id는 passport.session으로 넘어가 deserializeUser라는 함수가 실행된다
//
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;

// 미들웨어 함수를 사용할때 .use를 이용한다