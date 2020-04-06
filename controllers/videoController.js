import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", {
      pageTitle: "Home",
      videos,
    });
  } catch (error) {
    console.log(error);
    res.render("home", {
      pageTitle: "Home",
      videos: [],
    });
  }
};

export const search = (req, res) => {
  const {
    query: {
      term: searchingBy, // term(input의 이름)값에 searchingBy라는 이름을 붙혀준다
    },
  } = req; // = req.query.term 이랑 같다고 보면 된다. (구조분해할당)

  res.render("search", {
    pageTitle: "SEARCH",
    searchingBy,
    videos,
  });
};

export const getUpload = (req, res) =>
  res.render("upload", {
    pageTitle: "UPLOAD",
  });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", {
    pageTitle: "VIDOE_DETAIL",
  });

export const editVideo = (req, res) =>
  res.render("editVideo", {
    pageTitle: "EDIT_VIDEO",
  });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", {
    pageTitle: "DELETE_VIDEO",
  });

// render 함수의 첫번째 인자는 템플릿이고, 두 번째 인자는 템플릿에 추가할 정보가 담긴 객체
// render 함수는 첫 번째 인자는 페이지 파일명, 두 번째 인자로 보낼 값들을 object 형식으로 준다
// render는 설정된 템플릿 엔진을 사용해서 views를 렌더링 한다
// 파일명이랑 views폴더안에 있는 .pug파일을 불러온다~
