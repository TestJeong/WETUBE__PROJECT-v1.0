import express from "express";
import morgan from "morgan"; // log알려주는 미들웨어
import helmet from "helmet"; //보안을 위한 미들웨어
import cookieParser from "cookie-parser"; //요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어 입니다
import bodyParser from "body-parser"; //post로 요청된 body를 쉽게 추출할 수 있는 모듈이다, node.js의 post요청 데이터를 추출할 수 있도록 만들어 주는 미들웨어이다
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev")); // 미들웨어 함수를 사용할때 .use를 이용함


app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // 데이터 전송방식 get,post 방식이 있다.
app.use(routes.videos, videoRouter);

export default app;