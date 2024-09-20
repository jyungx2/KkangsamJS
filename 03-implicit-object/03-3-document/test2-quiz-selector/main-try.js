"use strict";

const formNode = document.querySelector(".form-register");
const resultNode = document.querySelector(".resultRegister");

const displayResult = function (message) {
  resultNode.innerHTML = message;
};

formNode.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputName = document.getElementById("username");
  const inputsHobby = document.querySelectorAll("input[name='hobby']:checked");
  const inputGender = document.querySelector('input[name="gender"]:checked');

  const resultHobby = [];
  inputsHobby.forEach((inputHobby) => resultHobby.push(inputHobby.value));

  let resultGender = ""; // 객체가 아닌 이상, 무조건 let으로 선언해야 한다!! (const는 선언한 순간, 못바꿈. 그대로 고정값을 가진다.)
  if (inputGender) {
    resultGender = inputGender.value;
  }

  const answer = `<p>이름: ${inputName.value}</p> <p>취미: ${resultHobby.join(
    ", "
  )}</p> <p>성별: ${resultGender}</p>`;
  displayResult(answer);
});
