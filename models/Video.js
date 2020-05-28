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
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  }, ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

// comments 에 배열을 쓴 이유는 comments는 여러사람들이 댓글을 다는 것이고
// video는 한 사람만이 등록을 했기때문이다

const model = mongoose.model("Video", VideoSchema);
export default model;


// Video라는 이름으로 VideoSchema를 사용 하겠다는 말. (여기서 Video는 아무 단어든 사용 할 수 있음)
// 데이터베이스에 들어가보면 자동으로 s를 붙혀 복수형으로 적용이 됨

// ref 필드는 언급 된 ID가 검색 될 콜렉션을 의미합니다.
// Room 스키마를 참고(ref)하여 type에 ObjectId를 넣습니다. 이로서 관계가 성립합니다.
//reference : 참고 "Comment" 모델에서 부합하는 ID를 찾겠다는 뜻이라고 해야할까요
// Schema란게 결국 몽구스 모델을 위한 오브젝트인데 지금 comments 라는 것의 타입을 id의 형태로 가정한다고 말할 수 있을 것 같습니다