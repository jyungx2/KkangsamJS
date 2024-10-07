"use strict";

// <h3> 태그 안에 결과 출력
function printResult(result) {
  const resultDOM = document.getElementById("result");
  resultDOM.innerHTML = result;
}

function axios_default() {
  // axios로 서버 연동 시, 공통적인 Config 설정이 있다면 Default 이용
  axios_create.defaults.baseURL = "http://localhost:3000/";
  axios_create.defaults.timeout = 2000; // 2초

  // defaults에 설정 후 요청(post).. Defaults에 설정한 내용이 기본 적용..
  // url 지정... baseURL + url
  axios
    .post("post_text", {
      name: "홍길동",
      age: 20,
    })
    .then((response) => printResult(response.data.msg));
}

function axios_create() {
  // 원한다면, 개발자가 axios객체를 직접 만들어서 공통적인 config 설정 바로 가능
  // 업무가 여러개로 구분되고, 하나의 업무를 여러번 요청하는 공통 설정이 있는 경우..
  const myAxios = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 2000,
  });

  // 위의 설정한 공통 config설정이 적용됨
  myAxios
    .post("post_text", {
      name: "홍길동",
      age: 20,
    })
    .then((response) => printResult(response.data.msg));
}

function axios_params() {
  // params config: Url뒤에 데이터를 추가해서 서버 전송
  // > Header에 추가해서, Url이 Header의 정보임으로..
  // > get/post/put/delete/patch 모두 가능!!(어차피 url은 있으니까)
  // > 모든 http request에 "url"은 항상 http request "header"에 지정함으로..
  // ❓모든 method에 params 데이터를 추가해서 서버 전송이 가능하다면.. Params만 이용하지 그래?
  // 👉 header 정보로 Data전송은 한계가 있다.. - 전송하는 데이터 사이즈에 한계 O, 보안상 문제 존재.
  // => 따라서 데이터 전송은 header가 아닌, body stream에서 해줘야 한다.
  axios({
    method: "get",
    url: "http://localhost:3000/get_test", // url을 요청시,
    // params: header정보를 통해 넘어가는 데이터
    params: {
      // 서버에 이 데이터를 전달하겠다.
      data1: "hello",
      data2: 10,
    },
  }).then((response) => {
    printResult(response.data.msg);
  });
  // Request URL: http://localhost:3000/get_test?data1=hello&data2=10
}

function axios_transform() {
  axios({
    method: "post",
    url: "http://localhost:3000/get_test",
    // data: body stream를 통해 넘어가는 데이터
    data: {
      // request body stream을 통해 데이터 전송,, url에는 나오지 않는다..
      // Post, put, patch에서만 사용 가능.
      name: "홍길동",
      age: 30,
    },
    // 필요하면 쓰이는 것들..
    transformRequest: [
      // 요청시 실행되어야 하는 함수 여러개를 배열에 담으면..
      // 등록한 순서대로 실행된다..
      function (data, headers) {
        // data: 서버에 전송해야할 body stream => 전송 전에 이 함수에서 조작가능
        // headers: 서버 요청 header 정보 => 전송 전에 조작..
        // 조작하기 전의 데이터 출력될 것.
        console.log(data);
        console.log(headers);
        headers["Content-Type"] = "application/json"; // 기존 header 정보에 없던 정보 추가
        let newData = { ...data, key: 1 }; // data에 하나 추가..
        return JSON.stringify(newData); // 리턴시킨 값이 서버전송..
      },
    ],
    transformResponse: [
      // 응답이 도착했을 때 실행될 함수.. 서버 데이터를 이용하기 전에 조작..
      function (data) {
        // 매개변수가 서버에서 받은 데이터..
        const jsonData = JSON.parse(data);
        let newData = { ...jsonData, index: 1 };
        return newData; // 마치 우리가 조작한 데이터가 서버에서 온 것처럼 사용가능..
      },
    ],
  }).then((response) => {
    console.log(response.data);
  });
}
