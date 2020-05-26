import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("join", {
    pageTitle: "JOIN",
  });
};

export const postJoin = async (req, res, next) => {
  const {
    body: {
      name,
      email,
      password,
      password2
    },
  } = req;

  if (password !== password2) {
    // 비밀번호가 같지 않다면(true)
    res.status(400);
    res.render("join", {
      pageTitle: "JOIN",
    });
  } else {
    try {
      const user = await User({
        email,
        name,
      }); // User.create()는 데이터베이스에 개체를 저장까지합니다.
      //User ({})는 DB를 사용하지 않고 사용자의 형태로 객체를 만듭니다.
      // join을 하면서 입력한 email과 name을 User모델의 email과 name에 넣어줍니다(저장은x)

      await User.register(user, password); // 이제 user에 저장한 값을 password와 같이 User모델에 등록을 해줍니다.
      // deserializeUser는 매번 페이지를 갈때마다 세션에 있는 id값을 받아 db에 조회환후 req.user에 저자장되는데 name과 email을 등록해놨기 때문이다
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

//user은 join을 하면서 email, name을 받아와서 user에 저장한 후 register를 이용하요 User모델에 user과 password를 저장한다.

export const getLogin = (req, res) =>
  res.render("login", {
    pageTitle: "LOGIN",
  });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {
      id,
      avatar_url,
      name,
      email
    },
  } = profile;
  console.log(profile);
  try {
    const user = await User.findOne({
      //우선 깃헙 이메일이 User모델에 있는지 확인한다
      email,
    });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
//passport로부터 우리에게 제공 되는 것. 깃헙이 주는 정보들
// 함수인데 이게 만약 실행이 되면 passport에게 이봐! 사용자가 성공적으로 로그인했다! 라고 말 할 수 있다
// 사용자가 깃헙으로 갔다가 돌아올때 실행되는 콜백함수

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const githubLogin = passport.authenticate("github"); //어떤 사용전략을 할것인가?

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const users = (req, res) =>
  res.render("users", {
    pageTitle: "USERS",
  });

export const getMe = (req, res) => {
  res.render("userDetail", {
    pageTitle: "USER_DETAIL",
    user: req.user, //현대 로그인 된 사용자
  });
};

export const userDetail = async (req, res) => {
  const {
    params: {
      id
    }
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", {
      pageTitle: "USER_DETAIL",
      user
    })
  } catch (error) {
    res.redirect(routes.home)
  }
}

export const changePassword = (req, res) =>
  res.render("changePassword", {
    pageTitle: "CHANGE_PW",
  });

export const editProfile = (req, res) =>
  res.render("editProfile", {
    pageTitle: "EDITE_PF",
  });

// try, cath는 예외처리 문법
// try에서 실행할 코드를 작성하고 try에서 오류가 발생했을 경우 cath에서 실행할 코드를 작성한다.