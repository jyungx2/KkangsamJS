"use strict";

const numNode = document.getElementById("num");
const resultNode = document.getElementById("result");

function sum() {
  // 버튼 클릭 이벤트 함수..
  // 유저 입력 데이터를 받아 서버에 요청(더하는 연산)이 필요한 순간
  // 근데 이때, 서버 요청을 비동기로 하고 싶다.
  // 1) 결과 획득까지 대기상태가 되지 않아 유저가 지속적으로 브라우저를 이용할 수 있도록..
  // 2) 서버 응답에 의해 화면이 새로고침되지 않도록..
  // ajax로 비동기 요청.. 결과를 데이터적으로 받아서 화면 업데이트..

  // 📌 본격적 시작!
  // 1. xhr 생성..
  let xhr = new XMLHttpRequest();

  // 2. 요청 정보 설정..
  // ✅ first parameter: 요청방식(get/post/put/delete/fetch)
  // ✅ second parameter: url (백엔드쪽에서 받아야함)
  // ✅ third parameter: 비동기 or 동기
  xhr.open("get", `http://localhost:3000/sum/${numNode.value}`, true);

  // 3. 서버에 업무 요청
  xhr.send();

  // 4. 서버로부터 결과를 받기 위해 콜백함수 등록
  xhr.onload = function () {
    if (xhr.status === 200) {
      // http response 상태 코드 값이 200인 경우에만 서버 실행 성공
      // ✨서버에서 넘어오는 데이터는 모두 "문자열"이다✨ (일반 문자열, Json문자열, xml문자열...)
      // JSON.parse(): json 문자열을 javascript object literal로 변형해서 핸들링
      let data = JSON.parse(xhr.responseText);
      // object로 바뀌면 'result' property에 결과가 저장되기 때문에..
      // 밑에서 data.result로 겟
      resultNode.innerHTML = data.result;
      // 서버에서 result에 결과 데이터를 담아서 전달함
    }
  };
}
