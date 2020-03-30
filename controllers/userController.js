import routes from "../routes";

export const getJoin = (req, res) => {
  res.render("join", {
    pageTitle: "JOIN"
  });
};

export const postJoin = (req, res) => {
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
    //사용자 등록
    res.redirect(routes.home);
  }
};



export const getLogin = (req, res) =>
  res.render("login", {
    pageTitle: "LOGIN"
  });
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};



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