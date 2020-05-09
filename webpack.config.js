const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  // mode는 속성을 정의하면 웹팩의 실행모드가 설정됨 총 3가지가 있는데
  // none: 모드 설정 안함
  // development: 개발 모드  개발자들이 좀 더 보기 편하게 웹팩 로그나 결과물이 보여짐
  // production: 배포 모드 성능 최적화를 위해 기본적인 파일 압축 등의 빌드 과정이 추가됨

  module: {
    rules: [{
        test: /\.(js)$/,
        use: [{
          loader: "babel-loader"
        }]
      },
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([{
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [
                  autoprefixer({
                    overrideBrowserslist: "cover 99.5%",
                  }),
                ];
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new ExtractCSS("styles.css")],
};

module.exports = config;

// rules -> use 아래에서 위로 실행이 됨
// sass-loader: scss를 받아서 일반 css로 변환
// postcss-loader: css를 받아서 우리가 주는 plugin을 받아서 css로 변환(예를 들어 '인터넷 익스플로와 호환되게 만들자!'라고 할 수 있음.)
// css 호환성 관련된 걸 해결함
// css-loader: 마지막으로 css-loader를 이용하면 webpack이 css를 이해할 수 있음.
// (웹팩은 모든 것을 모듈로 다루기 때문에 css 파일을 자바스크립트로 변환해서 로딩을 해줘야 하는데 그게 css-loader의 역활이다.)

//extract-text-webpack-plugin이란 css파일을 따로 분리해준다는 뜻.
//보통 css-loader로 자바스크립트로 변환을 한 파일들을 style-loader를 사용하여 번들링한 파일(main.js)에서 style태그로 만들어
//head 태그안에 넣어주는 역활을 합니다 근데 나중에 css파일이 커지고 그러면 힘들어져서 extract플러그인을 사용하요 css파일을 따로 분리하는 것입니다.

// output에서 plugins를 사용하고 ()안에 분리할 css파일의 이름을 작성합니다.