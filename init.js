import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`⭐️Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);

//init.js 에서 import를 해주는 이유는 app이 실행되자마자 db가 연결되도록 하고 싶은데, app이 시작할 때, 처음 실행되는 파일이
//init.js이기 떄문이다.

// init.js에서 app.listen을 이용하여 app.js를 실행 시키는데 여기에는 db와 models에 있는 Video,Comment등이 필요하기 때문에
//제일 먼저 실행이 되는 init.js에 import를 하는 것이다.