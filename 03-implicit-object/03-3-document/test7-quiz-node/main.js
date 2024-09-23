"use strict";

const btnAdd = document.querySelector(".btn--add");

btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  let inputToDo = document.querySelector("#inputToDo").value;

  if (!inputToDo || inputToDo.trim() === "") {
    alert("할 일을 입력하세요.");
  } else {
    const listNode = document.createElement("li");
    const textNode = document.createTextNode(`${inputToDo}`);
    listNode.appendChild(textNode);

    const resultNode = document.querySelector(".result");
    // resultNode.appendChild(listNode);
    resultNode.insertBefore(listNode, resultNode.childNodes[0]);

    listNode.addEventListener("click", function (e) {
      e.target.remove(); // 내가 작성한 코드 => 가장 직관적인듯..
      // resultNode.removeChild(listNode); // listnode 자체를 넣어도 괜춘지만..
      // resultNode.removeChild(this); // click 이벤트가 일어난 listnode들만 지움!
    });
  }
});
