const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video"); //id값을 찾을때 #을 작성한다
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScrnBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  })
}

function handlePlayClick() {
  if (videoPlayer.paused) {
    // 멈춰 있다면 1번 아니면 2번
    videoPlayer.play(); // 재생중이면서 일시정지 아이콘을 보여줌
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause(); // 일시정지가 되면서 재생아이콘을 보여줌
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    // videoPlayer.muted === true 라는 뜻 음소거가 되어있다면 1번 아니면 2번
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitFullScreen() {
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScrnBtn.addEventListener("click", goFullScreen);
  document.webkitExitFullscreen();
}

function goFullScreen() {
  videoContainer.requestFullscreen();
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener("click", goFullScreen);
  fullScrnBtn.addEventListener("click", exitFullScreen);
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};
// parseInt는 뒤에 10은 seconds값이 10진수라는 것.
// 진수 변경시 8진수 24을 10진수로 변경하려면 parseInt(24, 8)이런식으로 적는다

function setTotalTime() {
  console.log(videoPlayer.duration);
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000); // 일정한 시간 간격으로 코드를 반복 실행하는 함수 1000ms가 1s(초)
}

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime)); // Math 수학관련 객체 floor소수점 제거
}

function hadnleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: {
      value
    },
  } = event;
  videoPlayer.volume = value;

  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.3) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function init() {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", hadnleEnded);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) {
  init(); // 이 페이지에 있다는 걸 체크하기 위해
}

//douration - 초단위의 미디어길이를 double값으로 리턴한다
// parseint()는
// 1. 소숫점 아래는 버림
// 2. 공백이 있으면 앞 숫자만
// 3. 숫자 + 문자는 앞 숫자만
// 4. 문자 + 숫자는 NaN이 발생

// formatDate : 시간(초)가 주어졌을때, 그 초를 00:00:00 형식으로 변환하는 함수
// ex) 10000초 00:00:00 형식으로 바꾸고자할 경우,
// secondsNumber는 초를 10진법 정수로 설정하는거고,
// hours는 1시간 3600초, 10000/3600 = 2.777777778시간(앞에 2는 시간, 소수점이하 제거(floor함수).
// minutes는 1분 60초, (10000 - (2*3600초))/60초 = 46.6666666분(앞에 46은 분단위, 소수점제거)
// totalSeconds는 (10000초 - 7200초(즉,2시간*3600초) - 2760초(즉,46분*60초)) = 40초
// 결국 10000초를 주어진 형식으로 변환하면 02:46:40

// 이벤트 객체
// - 현재 담고 있는 이벤트의 정보를 가지고 있는 객체
// - 함수 내부 매개변수로 e또는 event를 넣어 이벤트 내용을 확인 또는 사용 가능하다
// - function 이벤트함수명 (e){ };
// - 마우스를 클릭한 그 지점의 정보를 모두 불러올 수 있다
// 이벤트가 실행된 맥락의 정보가 필요할 때는 이벤트 객체를 사용할 수 있습니다.
// 이벤트 객체는 이벤트가 실행될 때 이벤트 핸들러의 인자로 전달됩니다.