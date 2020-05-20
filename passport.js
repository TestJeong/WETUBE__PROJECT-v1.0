import passport from "passport";
import User from "./models/User";
import GithubStrategy from "passport-github";
import {
  githubLoginCallback
} from "./controllers/userController";
import routes from "./routes";


passport.use(User.createStrategy()); //strategy는 로그인하는 방식

passport.use(new GithubStrategy({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: `http://localhost:4000${routes.githubcallback}`
}, githubLoginCallback))
// 깃헙에서 돌아오는 과정이다

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());