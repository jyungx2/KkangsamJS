"use strict";

let idNode = document.getElementById("idName");
let passwordNode = document.getElementById("password");
let loginNode = document.getElementById("login");
let formNode = document.getElementById("form");

let resultIdNode = document.querySelector(".resultId");
let resultPasswordNode = document.querySelector(".resultPassword");
let resultNode = document.querySelector(".result");

function printResult1(msg) {
  resultIdNode.innerHTML = msg;
}

function printResult2(msg) {
  resultPasswordNode.innerHTML = msg;
}

// 각 입력요소에서 blur 이벤트 발생시점에 유효성 검증 체크해서 유효하지 않은 경우 위처럼 에러 출력
idNode.addEventListener("blur", (e) => {
  let inputId = e.target.value;

  if (!inputId) {
    printResult1(`아이디는 필수 입력입니다.`);
    resultIdNode.style.color = "red";
  } else {
    printResult1(``);
  }
});

passwordNode.addEventListener("blur", (e) => {
  let inputPassword = e.target.value;
  let regExpPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,16}$/;

  if (!inputPassword) {
    printResult2(`패스워드는 필수 입력입니다.`);
    resultPasswordNode.style.color = "red";
  } else if (!regExpPassword.test(inputPassword)) {
    printResult2(`패스워드는 영문자 숫자 조합 6자 이상이어야 합니다.`);
    resultPasswordNode.style.color = "red";
  } else {
    printResult1(``);
  }
});

// 로그인 버튼 클릭 시점에 동일한 유효성 검증 체크, 유효하지 않은 경우 에러출력
loginNode.addEventListener("click", (e) => {
  e.preventDefault();

  if (!idNode.value) {
    printResult1(`아이디는 필수 입력입니다.`);
    resultIdNode.style.color = "red";
  } else {
    printResult1(``);
  }

  if (!passwordNode.value) {
    printResult2(`패스워드는 필수 입력입니다.`);
    resultPasswordNode.style.color = "red";
  }
});

// 로그인 버튼 클릭 시점에 모든 입력 요소 유효한 경우 마지막 화면처럼 결과 문자열 출력
formNode.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(`폼제출이벤트!!`);

  if (idNode.value && passwordNode.value) {
    resultNode.innerHTML = `${idNode.value}와 ${passwordNode.value}로 로그인을 시도합니다.`;
  }
});

// 유저입력 데이터는 비신뢰적인 마인드로 개발하기 때문에, 데이터를 바로 서버로 넘기지 않고, 필수적으로 유효성 검증을 체크한 뒤 전송하도록 한다..
