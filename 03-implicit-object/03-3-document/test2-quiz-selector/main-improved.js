"use strict";

let formNode = document.querySelector(".form-register");
let resultNode = document.querySelector(".result-register");

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
  // querySelector로 불러오는 Nodelist는 진짜 array가 아니기 때문에, map/reduce/filter같은 메서드 사용불가... forEach만 유일하게 쓸 수 있는 메서드.

  let genderResult = "";
  if (gender) {
    genderResult = gender.value;
  }

  const msg = `이름: ${name.value}<br>취미: ${hobbyResult}<br>성별: ${genderResult}`;
  displayResult(msg);
});
