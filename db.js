import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
}); //- 포트번호/Datebase이름


const db = mongoose.connection

const handleOpen = () => console.log("⭐️ Connected to DB");
const handleError = error => console.log(`💥 Errow on DB Connectionc: ${error}`);

db.once("open", handleOpen); //-이벤트에 대한 일회성 리스너를 추가합니다. 이 리스너는 다음에 이벤트가 실행될 때만 호출되며, 그 후에 제거됩니다.
db.on("error", handleError);