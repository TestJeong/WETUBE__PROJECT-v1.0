import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`⭐️Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);

//init.js 에서 import를 해주는 이유는 app이 실행되자마자 db가 연결되도록 하고 싶은데, app이 시작할 때, 처음 실행되는 파일이
//init.js이기 떄문이다.