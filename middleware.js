import multer from "multer";
import routes from "./routes";

const multervideo = multer({
  dest: "uploads/videos/"
}); // 업로드될 파일의 기본경로, 입력한 파일이 지정한 경로 폴더 내에 저장된다.

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};

export const uploadVideo = multervideo.single("videoFile");