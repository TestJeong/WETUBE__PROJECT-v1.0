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
    body: {
      title,
      description
    },
    file: {
      path
    },
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
// 파일명이랑 views폴더안에 있는 .pug파일을 불러온다

// req.body는 POST 방식의 데이터 요청하는 일부로, post 방식을 사용할때는 body를 사용한다(get의 경우 req.query 형식을 사용)
// body는 기본적으로 undefuned값이라 body를 읽을려면 body-parser 모듈이 있어야한다.
// req.body POST 요청의 일부로 클라이언트에서 전송 된 매개 변수를 보유합니다

//path는 파일 경로.

//// POST user[name]=tobi&user[email]=tobi@learnboost.com
//req.body.user.name
// => "tobi"

//req.body.user.email
// => "tobi@learnboost.com"

// POST { "name": "tobi" }
//req.body.name
// => "tobi"