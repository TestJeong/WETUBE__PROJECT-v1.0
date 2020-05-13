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
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
    }
  }
};



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