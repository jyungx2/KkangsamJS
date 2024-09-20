"use strict";

let area1 = document.getElementById("area1");
let area2 = document.getElementById("area2");
let area3 = document.getElementById("area3");

// eventHandler 등록, bubbling 단계에서 실행할 handler...
area1.addEventListener("click", function () {
  console.log("Bubbling - Area1 - Event handler");
});

area2.addEventListener("click", function () {
  console.log("Bubbling - Area2 - Event handler");
});

area3.addEventListener("click", function () {
  console.log("Bubbling - Area3 - Event handler");
  event.stopPropagation(); // capturing 단계에서 이벤트 실행은 정상적으로 실행
  // & area3에 대한 버블링 컨솔도 정상 실행되지만,(Stop함수보다 위에 작성돼 있으니까)
  // 하지만 bubbling 단계에서 실행을 막아 상위의 이벤트들은 실행 ❌
});

// event handler... capturing 단계에서 실행되게 하려면 세번째 매개변수를 true로
area1.addEventListener(
  "click",
  function () {
    console.log("Capturing - Area1 - Event handler"); // 정상 실행
    event.stopPropagation(); // 이 코드 때문에 오직 위의 코드만 실행
  },
  true
);

area2.addEventListener(
  "click",
  function () {
    console.log("Capturing - Area2 - Event handler");
  },
  true
);

area3.addEventListener(
  "click",
  function () {
    console.log("Capturing - Area3 - Event handler");
  },
  true
);

let link1 = document.getElementById("link1");
let form1 = document.getElementById("form--1");

link1.addEventListener("click", function (e) {
  console.log(`link click....`); // 출력 후 구글로 이동
  // js code에서 Ajax로 서버 연동처리..
  e.preventDefault();
});

form1.addEventListener("submit", function (e) {
  console.log(`form submit...`); // 출력 후 구글로 이동

  // broswer form 의 이벤트처리보다는 js code에서 ajax로 서버 연동
  e.preventDefault();
});

// capturing(상위 -> 하위) -> targeting 완료 -> bubbling(하위  -> 상위)

// 💫 결과 출력
// Capturing - Area1 - Event handler
// Capturing - Area2 - Event handler
// Capturing - Area3 - Event handler
// Bubbling - Area3 - Event handler
// Bubbling - Area2 - Event handler
// Bubbling - Area1 - Event handler
