import routes from "../routes";
import User from "../models/User"
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("join", {
    pageTitle: "JOIN"
  });
};

export const postJoin = async (req, res, next) => {
  const {
    body: {
      name,
      email,
      password,
      password2
    }
  } = req;

  if (password !== password2) {
    // 비밀번호가 같지 않다면(true)
    res.status(400);
    res.render("join", {
      pageTitle: "JOIN"
    });
  } else {
    try {
      const user = await User({
        email,
        name
      }); // .create는 데이터베이스에 개체를 저장합니다.
      //User ({})는 DB를 사용하지 않고 사용자의 형태로 객체를 만듭니다.
      // join을 하면서 입력한 email과 naem을 User모델의 email과 name에 넣어줍니다(저장은x)

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
    pageTitle: "LOGIN"
  });

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home
});



export const logout = (req, res) => {
  res.redirect(routes.home);
};




export const users = (req, res) =>
  res.render("users", {
    pageTitle: "USERS"
  });

export const userDetail = (req, res) =>
  res.render("userDetail", {
    pageTitle: "USER_DETAIL"
  });

export const changePassword = (req, res) =>
  res.render("changePassword", {
    pageTitle: "CHANGE_PW"
  });

export const editProfile = (req, res) =>
  res.render("editProfile", {
    pageTitle: "EDITE_PF"
  });