import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
  },
  title: {
    type: String,
    required: "Tilte is required",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

// comments 에 배열을 쓴 이유는 comments는 여러사람들이 댓글을 다는 것이고
// video는 한 사람만이 등록을 했기때문이다

const model = mongoose.model("Video", VideoSchema);
export default model;
