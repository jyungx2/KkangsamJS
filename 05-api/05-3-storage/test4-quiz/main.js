"use strict";

const resultArea = document.querySelector(".result");
const inputID = document.getElementById("id");
const inputPW = document.getElementById("password");
const btnLogin = document.querySelector(".btn--login");
const loginSection = document.querySelector(".login-section");

let login = false;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  if (inputID.value === inputPW.value) {
    loginSection.innerHTML = "";
    resultArea.textContent = `${inputID.value}로 로그인 되었습니다.`;
    login = true;

    const btnLogout = document.createElement("button");
    btnLogout.appendChild(document.createTextNode("Logout"));
    loginSection.appendChild(btnLogout);

    btnLogout.addEventListener("click", function (e) {
      e.preventDefault();

      // 다시 로그인창으로 돌리기
      loginSection.innerHTML = `
      <label for="id">ID: </label>
      <input type="text" id="id" class="input"><br>
      <label for="password">PW: </label>
      <input type="password" id="password" class="input"><br>
      <button class="btn--login">Login</button>
    `;

      // resultArea 초기화
      resultArea.textContent = "";

      // 새로 생성된 로그인 버튼에 이벤트 리스너 재부여
    });
  }
});
