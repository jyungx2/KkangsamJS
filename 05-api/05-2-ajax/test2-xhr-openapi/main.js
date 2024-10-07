"use strict";

let button = document.getElementById("button");
let table = document.getElementById("result");

button.addEventListener("click", function () {
  // 객체 생성
  let xhr = new XMLHttpRequest();

  // open()로 url제공 = 요청준비(초기화)
  xhr.open(
    "get",
    "http://openAPI.seoul.go.kr:8088/4b7a7049756c6565343079796e6e44/json/RealtimeCityAir/1/99/",
    true
  );

  // 서버에 있는 결과가 넘어올 때 아래 함수가 콜 될것.
  xhr.onload = function () {
    // > 결과 데이터 획득..
    let result = xhr.responseText;

    // > 받은 문자열을 Object literal 객체로 변환..
    // 💫 만약 xml형식의 데이터였다면 xml 파싱..
    // 💫 json은 xml과 다르게 바로 객체로 전환시킬 수 있어서 편하다.
    // 💫 json 문자열인 경우만 JSON.parse()의 매개변수로 넣을 수 있음
    let resultObj = JSON.parse(result);
    // 필요한 데이터를 추출한다.

    // 각 구청 데이터
    let rows = resultObj["RealtimeCityAir"]["row"]; // 오브젝트들이 배열에 담겨 있는 형태로 데려옴 => 배열에 있는 데이터를 루프문으로 하나씩 가져오자
    let resultTxt = "";
    for (let i = 0; i < rows.length; i++) {
      let name = rows[i]["MSRSTE_NM"]; // 위치 - OO구
      let value = rows[i]["IDEX_MVL"]; // 미세먼지 농도 값
      let grade = rows[i]["IDEX_NM"]; // 미세먼지 농도 단계

      resultTxt += `
      <tr>
        <td>${name}</td>
        <td>${value}</td>
        <td>${grade}</td>
      </tr>
    `;
    }

    table.innerHTML = resultTxt;
  };

  // 서버 요청
  xhr.send();
});
