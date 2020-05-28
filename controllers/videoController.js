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

// Serach ------------------------------------------------------------------------

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
        $regex: searchingBy, // regex는 원하는 단어를 검색해줌
        $options: "i", // 여기서 옵션은 "안녕" 이라는 단어중 "안" 만 입력해도 "안"으로 시작되는 단어를 다 찾는 옵션
      },
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

// Upload ------------------------------------------------------------------------

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
    title, // title : title ( Video 모델에서 스키마로 정의한 이름 : 값)
    description, // description : description
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id); // 파일을 업로드 하면 User 모델안에 videos라는 스키마에 내가 어떤 비디오를 올렸는지 해당 비디오의 id값을 준다
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
  // redirect는 단순히 원한는 페이지를 보여준다(데이터를 전송할수가 없디)
  // render같은 경우는 데이터 전송이 가능하다(미들웨어에서 만들어놓은 변수들을 사용 할 수 있다)
  // upload 탬플릿에서 파일, 제목, 설명을 다 적고 "완료"를 누르면 videoDetail 템플릿으로 열어라는 뜻.
};
// 몽구스에서 id는 기본적으로 도큐먼트의 _id 필드를 반환하는, 각각의 스키마에 배정되는 가상의 값이다
// 기본적으로 upload 할때마다 파일마다 가상의 id값이 부여가 된다.

// VideoDetaill ------------------------------------------------------------------------

export const videoDetail = async (req, res) => {
  const {
    params: {
      id
    },
    //주소에 포함된 변수를 담는다. 예를 들어 https://okky.com/post/12345 라는 주소가 있다면 12345를 담는다

  } = req;
  try {
    const video = await Video.findById(id).populate("creator")
    console.log(video);
    res.render("videoDetail", {
      pageTitle: video.title,
      video, //video란 params로 받은 id값을 받아 Video 모델에서 받은 id값에 맞는 데이터 정보들을 템플릿페이지로 이동해 템플릿 페이지에서 사용한다.
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// getEditVideo ------------------------------------------------------------------------

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

// deleteVideo ------------------------------------------------------------------------

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
// render는 설정된 템플릿 엔진(pug)을 사용해서 views를 렌더링 한다
// 파일명이랑 views폴더안에 있는 .pug파일을 불러온다

// query 란 데이터베이스에서 정보를 요청하는 것
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