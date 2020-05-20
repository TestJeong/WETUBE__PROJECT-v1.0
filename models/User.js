import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});
//usernameField는 어떤 field를 username으로 할것인지 정하는 것

const model = mongoose.model("User", UserSchema);

export default model;