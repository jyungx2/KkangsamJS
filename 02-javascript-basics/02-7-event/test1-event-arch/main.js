"use strict";

// html 문서 로딩 완료 이벤트... dom node가 메모리에 완성된 순간
// 이벤트 리스너 함수 ✅
window.addEventListener("load", () => {
  console.log(`html 문서 로딩이 완료..`);
});

// 이벤트 리스너 함수 ❌
// => 💥코드 읽을 때 의미 파악 어려움💥
// 이벤트명: load일 때 바로 onload
window.onload = () => {
  console.log(`html 문서 로딩이 완료... 2`);
};

// id없는 button3 태그에 onclick을 이용해 직접 연결.
const myEventHandler = () => {
  console.log(`myEventHandler.. button click`);
};

// 이벤트 리스너 함수 ✅
let button1Node = document.getElementById("button1"); // 요소(노드) 선택
button1Node.addEventListener("click", () => {
  console.log("button 1 click");
});

// 이벤트 리스너 함수 ❌
// 이벤트명: click일 때 이벤트 리스너 함수 쓰지 않고 바로 onclick
let button2Node = document.getElementById("button2");
button2Node.onclick = () => {
  console.log("button 2 click");
};
