"use strict";

let button = document.getElementById("button");
let table = document.getElementById("result");

button.addEventListener("click", function () {
  // 📌 xhr로 했던 통신을 이제는 axios로 하자
  axios({
    method: "get",
    url: "http://openAPI.seoul.go.kr:8088/4b7a7049756c6565343079796e6e44/json/RealtimeCityAir/1/99/",
  }).then((response) => {
    // axios의 경우, 서버에서 넘어온 데이터가 Json 문자열이면..
    // 우리가 직접 Object로 전환하지 않아도 자동 전환된다..(JSON.parse할 필요 ❌)
    let rows = response.data.RealtimeCityAir.row;
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
  });

  /*
  // 📌 XMLHttpRequest() 이용
  let xhr = new XMLHttpRequest();
  xhr.open(
    "get",
    "http://openAPI.seoul.go.kr:8088/4b7a7049756c6565343079796e6e44/json/RealtimeCityAir/1/99/",
    true
  );

  xhr.onload = function () {
    let result = xhr.responseText;
    let resultObj = JSON.parse(result);

    // 각 구청 데이터
    let rows = resultObj["RealtimeCityAir"]["row"]; //
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
  */
});
