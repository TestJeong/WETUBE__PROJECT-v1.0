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

export const search = async (req, res) => {
  const {
    query: {
      term: searchingBy, // term(input의 이름)값에 searchingBy라는 이름을 붙혀준다
    },
  } = req; // = req.query.term 이랑 같다고 보면 된다. (구조분해할당)
  let videos = [];
  try {
    videos = await Video.find({
      title: {
        $regex: searchingBy,
        $options: "i",
      }
    });
  } catch (error) {
    console.log(error);
  }
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
  console.log(req.file.path);
  res.redirect(routes.videoDetail(newVideo.id));
};
// 몽구스에서 id는 기본적으로 도큐먼트의 _id 필드를 반환하는, 각각의 스키마에 배정되는 가상의 값이다
// 기본적으로 upload 할때마다 파일마다 가상의 id값이 부여가 된다.

export const videoDetail = async (req, res) => {
  const {
    params: {
      id
    },
  } = req;
  try {
    const video = await Video.findById(id);
    console.log(video);
    res.render("videoDetail", {
      pageTitle: video.title,
      video,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: {
      id
    },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", {
      pageTitle: `Edit ${video.title}`,
      video,
    });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: {
      id
    },
    body: {
      title,
      description
    },
  } = req;
  try {
    await Video.findOneAndUpdate({
      _id: id,
    }, {
      title,
      description,
    });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: {
      id
    },
  } = req;
  try {
    await Video.findOneAndRemove({
      _id: id,
    });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// render 함수의 첫번째 인자는 템플릿이고, 두 번째 인자는 템플릿에 추가할 정보가 담긴 객체
// render 함수는 첫 번째 인자는 페이지 파일명, 두 번째 인자로 보낼 값들을 object 형식으로 준다
// render는 설정된 템플릿 엔진을 사용해서 views를 렌더링 한다
// 파일명이랑 views폴더안에 있는 .pug파일을 불러온다

// req.body는 POST 방식의 데이터 요청하는 일부로, post 방식을 사용할때는 body를 사용한다(get의 경우 req.query 형식을 사용)
// body는 기본적으로 undefuned값이라 body를 읽을려면 body-parser 모듈이 있어야한다.
// req.body POST 요청의 일부로 클라이언트에서 전송 된 매개 변수를 보유합니다

// req.file은 upload.pug에서 input에 type을 file로 만든 것의 object를 불러온다
// path는 파일 경로. (uploads/videos/id값 73a94d857029ds8345d70df92834)

//// POST user[name]=tobi&user[email]=tobi@learnboost.com
//req.body.user.name
// => "tobi"

//req.body.user.email
// => "tobi@learnboost.com"

// POST { "name": "tobi" }
//req.body.name
// => "tobi"

// req.parmes.id의 id는 routes.js에 정해놓은 /:id 값이 된다
// req.parmes 는 routes.js에 정의해놓은 videoDetail 의 " /:id " 이거 인데
// :id는 언제나 변하는 값이니깐 videoDetail 변수에 화살표 함수로 만들어 놓은 id 값이 들어감

// findOneAndUpdate는 두 개의 인수를 취합니다. 첫 번째는 객체를 찾는 방법에 대한 조건이있는 객체입니다.
//따라서이 경우 findOneAndUpdate ({id : id}, SECOND_ARG)
//두 번째 인수는 FIRST_ARGUMENT로 찾은 객체에서 업데이트하려는 데이터입니다.
//findOneAndUpdate ({id : 1}, {title : "hello"})는 id가 1 인 요소를 찾고 제목을 'hello'로 변경합니다.