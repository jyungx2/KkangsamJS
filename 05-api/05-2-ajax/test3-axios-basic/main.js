"use strict";

// <h3> 태그 안에 결과 출력
function printResult(result) {
  const resultDOM = document.getElementById("result");
  resultDOM.innerHTML = result;
}

function axios_basic() {
  const num = document.querySelector("#num").value;

  // 서버 요청
  axios({
    methods: "get",
    // 로컬 컴퓨터를 지칭하는 ip : 127.0.0.1 (고정 Ip address : 서버의 주소)
    // 로컬 컴퓨터를 지칭하는 도메인: Localhost = 127.0.0.1 로 써도 동일.
    url: `http://localhost:3000/sum/${num}`,
  }).then((response) => {
    printResult(response.data.result);
  });
}

function axios_get() {
  const num = document.querySelector("#num").value;
  axios
    .get(`http://localhost:3000/sum/${num}`)
    .then((response) => printResult(response.data.result));
}

function axios_post() {
  // 1) header 정보
  // > Request 헤더에서 개발자와 직접적으로 관련있는 정보 = http request method
  // : get(default), post, put, delete, patch, head, option
  // prettier-ignore

  // 💥 모든 업무들은 CRUD server (=Create Read Update Delete) 방식?으로 데이터를 관리하고 처리한다. (ex. 게시판, 장바구니...)
  // 💡 get: 데이터 좀 줄래? = Read 업무⭐️
  // 💡 post: 데이터 왕창 줄테니까 저장 좀 해줄래? = Create 업무⭐️
  // 💡 put: 기존 데이터 수정 좀 해줄래? = Update 업무
  // 💡 delete: 너희가 가지고 있는 데이터 중에 이 데이터 좀 삭제해줄래? = Delete 업무
  // prettier-ignore

  // 🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼
  // 2) body - 실제 서버에 넘어가는 데이터
  // 💫 body를 활용해 데이터를 넘기겠다는 요청 = post, put
  // * body에 담기는 데이터 형식의 규약은 없다. (문자열, search 문자열, json 문자열)
  // 💫 body가 아닌, header 정보(url)를 통해서 요청하는 방식 = get
  // ex) url: `http://localhost:3000/sum/${num}`
  // => 만약 데이터를 서버에 넘기겠다면, url(= request의 헤더 정보)에 데이터를 추가해서 데이터를 넘김.
  // - url path에 추가해서 넘기거나 : ~~~/sum/10
  // - url search 문자열(query 문자열): ~~~~/sum?a1=10%name=kim

  axios.post(`http://localhost:3000/post_test`, {
    // post 방식이다.. request body 데이터..
    name: '홍길동',
    age: 20
  }).then(response => {
    printResult(response.data.msg)
  })
}
