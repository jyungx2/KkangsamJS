//단순 ajax 테스트

const express = require("express");
const bodyParser = require("body-parser");

//마지막에 추가해서 테스트
const cors = require("cors");

const app = express();

// 4️⃣ 지금 테스트 구조에서 front app의 Origin은..
// http://127.0.0.1:5502/05-api/05-2-ajax/test1-xhr/index.html

// 💥 근데, 백엔드의 origin은 http://localhost:3000/sum/10으로
// 이 구조에서는 CORS 문제가 발생한다.

// CORS문제를 해결하기 위해서 백엔드에서 Response header에.. origin이 상이하더라도 통과시켜달라고 명시해야한다. ❓
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;

// 2️⃣ get방식의 요청이 들어왔을 때, sum 함수 실행
function sum(request, response, next) {
  console.log("sum..");

  // response.setHeader('Access-Control-Allow-Origin', '*');
  // response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");

  // 2️⃣ 요청 url에 있는 no정보 획득..
  let no = request.params.no;
  let result = 0;
  for (let i = 1; i <= no; i++) {
    result += i;
  }

  // 3️⃣ 결과를 client에게 보낸다.. response.. 일반 문자열이 아닌, json데이터로..
  // response.setHeader("Content-Type", "text/plain;charset=utf-8");
  response.json({ status: 200, result: result });
}

// 1️⃣ 클라이언트의 Request가 get방식으로 /sun/:no로 들어온다면.. sum 함수를 실행시켜라
// xhr.open("get", `http://localhost:3000/✨sum/${numNode.value}✨`, true);
app.get("/sum/:no", sum);

app.post("/post_test", (request, response, next) => {
  console.log(request.body);
  response.json({ status: 200, msg: "post request success" });
});
app.get("/get_test", (request, response, next) => {
  console.log(request.query);
  response.json({ status: 200, msg: "get_test request success" });
});

app.get("/text_test", (request, response, next) => {
  console.log(`text_test, ${request.headers["accept"]}`);
  response.send("text_test request success");
});

app.listen(PORT, () => {
  console.log(`1 listening at http://localhost:${PORT}`);
});
