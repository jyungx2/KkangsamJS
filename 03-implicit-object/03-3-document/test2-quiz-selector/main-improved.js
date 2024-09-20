"use strict";

let formNode = document.querySelector(".form-register");
let resultNode = document.querySelector(".resultRegister");

function displayResult(msg) {
  resultNode.innerHTML = msg;
}

formNode.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.getElementById("username");
  let hobby = document.querySelectorAll('input[name="hobby"]:checked');
  let gender = document.querySelector('input[name="gender"]:checked');

  let hobbyResult = "";
  hobby.forEach((item) => {
    hobbyResult += `${item.value}`;
  });

  let genderResult = "";
  if (gender) {
    genderResult = gender.value;
  }

  const msg = `이름: ${name.value}<br>취미: ${hobbyResult}<br>성별: ${genderResult}`;
  displayResult(msg);
});
