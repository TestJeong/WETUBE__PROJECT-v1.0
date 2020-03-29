export const join = (req, res) => res.render("join", {
  pageTitle: "JOIN"
});
export const login = (req, res) => res.render("login", {
  pageTitle: "LOGIN"
});
export const logout = (req, res) => res.render("logout", {
  pageTitle: "LOGOUT"
});
export const users = (req, res) => res.render("users", {
  pageTitle: "USERS"
});
export const userDetail = (req, res) => res.render("userDetail", {
  pageTitle: "USER_DETAIL"
});
export const changePassword = (req, res) => res.render("changePassword", {
  pageTitle: "CHANGE_PW"
});
export const editProfile = (req, res) => res.render("editProfile", {
  pageTitle: "EDITE_PF"
});