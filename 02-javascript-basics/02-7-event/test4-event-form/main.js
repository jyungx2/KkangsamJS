"use strict";

let result = document.getElementById("result");
let form = document.getElementById("form");

function printResult(msg) {
  result.innerHTML = msg;
}

// 💡 Form 요소 전체를 전송할 때는 submit 버튼이 관여
// submit
// => form 요소 안에 있는 submit버튼을  이벤트가 발생했을 때 -----
form.addEventListener("submit", (e) => {
  // 🚨 submit함수가 작동하지 않는 이유??
  // html 문서에 action 속성에 입력 정보를 전달할 링크를 입력해주지 않았으므로, 여기선 그냥 자신의 html을 다시 가져온 다음, 새로고침되어 반짝 나타났다 사라진 것! (사실 작동한 건데 새로고침때문에 안 보인 것.)

  // 즉, form의 submit은 브라우저의 기본 이벤트가 JS코드 1줄도 작성 안해도, Form으로 묶여 있는 모든 입력되는 정보들을 모두 서버로 전송한 후, 화면을 refresh하도록 설정돼 있어서, 이를 리셋해줘야 함.

  // 👉 즉, Form의 Submit은 기본으로 서버 요청 후 결과로 화면을 갱신처리한다. 근데 우리는 이걸 막아야 함!! (submit 함수를 )
  e.preventDefault();
  printResult("submit event...");
});

form.addEventListener("reset", () => {
  printResult("reset event...");
});

// 1) Event 걸려면 일단 이벤트 소스를 등록해줘야 함! (노드 객체 등록)
let input1 = document.getElementById("input1");
let select1 = document.getElementById("select1");

// 2) 이벤트소스(input1)에 이벤트 리스너로 이벤트 핸들러를 연결
// ---------------- input -----------------
input1.addEventListener("focus", (e) => {
  // 📌 focus되는 순간, 색상 변경해보자!
  // 현재 이벤트가 발생한 dom node 객체 획득하자. -> input1 말고!
  // event 객체를 통해서 현재 이벤트가 발생한 node 객체 획득 가능..
  // e.target : 현재 이벤트가 발생한 객체 (이 객체 상에서 이벤트가 발생했다!)
  e.target.style.background = "pink";
});

// 📌 focus를 잃어버리는 순간(다른 곳 클릭), 다시 원래색으로 돌아옴
input1.addEventListener("blur", (e) => {
  e.target.style.background = "";

  //  유저 입력 데이터 획득하자.
  printResult(`input data : ${e.target.value}`);
});

// --------------- focus -----------------
select1.addEventListener("focus", (e) => {
  e.target.style.background = "pink";
});
select1.addEventListener("change", (e) => {
  printResult(`input change : ${e.target.value}`);
});
select1.addEventListener("blur", (e) => {
  e.target.style.background = "";
});
