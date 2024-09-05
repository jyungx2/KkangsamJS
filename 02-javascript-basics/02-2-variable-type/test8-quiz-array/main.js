"use strict";

let countNode = document.getElementById("count");
let resultNode = document.getElementById("result");

// members 라는 배열 변수 선언
let members = [];

// 화면에 배열의 결과를 출력하는 함수
function printResult() {
  countNode.innerHTML = members.length;
  let resultTxt = "";
  members.forEach((value) => {
    resultTxt += `<li>${value}</li>`;
  });
  resultNode.innerHTML = resultTxt;
}

function addMember(member) {
  // 이름을 입력받아 배열에 추가
  let result = prompt("추가할 멤버 이름을 입력해 주세요");
  members.push(result);

  printResult();
}

function deleteMember(member) {
  // 배열에서 멤버 제거
  members.pop();

  //  let result2 = prompt("삭제할 멤버 이름을 입력해 주세요");
  //  members.splice(members.indexOf(result2), 1);
  printResult();
}

printResult();
