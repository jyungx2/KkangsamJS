"use strict";

// 📌 innerHTML vs innerText .......
// 둘 다 특정 노드의 바디를 지칭하는데 차이가 있다...

let oneNode = document.getElementById("one");
let twoNode = document.getElementById("two");

// 📌 특정 노드에 바디를 획득하고자 한다...
// 1️⃣ innerHTML (자체적으로 parsing하기 때문에, html 태그를 인식하여 문서화함!)
// => body 내에 태그가 포함되어 있어도, 그대로 출력.
console.log(oneNode.innerHTML); // hello
console.log(twoNode.innerHTML); // <a href="#">google</a>

// 2️⃣ innerText (html 태그를 제외한, 순수 텍스트만을 출력 - parsing ❌)
// =>  body 내에 태그를 무시.
console.log(oneNode.innerText); // hello
console.log(twoNode.innerText); // google

// 📌 특정 노드의 바디에 문자열을 추가해서 출력하고자 한다..
let result1 = document.getElementById("result--1");
let result2 = document.getElementById("result--2");

// 1️⃣ innerHTML
// 동적 문자열이지만, innerHTML로 지정한 문자열을 Html parser가 파싱한다.
// 태그가 포함되 어 있다면 태그 효과를 적용
result1.innerHTML = `<a href="#">Google</a>`;
// 👉 <a> 태그를 parsing하여 Google이라는 하이퍼링크 출력.

// 2️⃣ innerText
// 태그가 있다하더라도 태그로 인지하지 않고 문자열로 인지.. 태그가 화면에 그대로 출력.
result2.innerText = `<a href="#">google</a>`;
// 👉 html 태그 인식 안하므로, <a href="#">google</a> 출력.

// 📌 속성 핸들링
let link1 = document.getElementById("link--1");

// 🔑 속성값(attribute) 획득
// >> 바로 .으로 불러올 수도 있다.
console.log(link1.href); // http://www.google.com/
// image 태그 였다면 src를 얻을 수 있는 셈!

// >> 아니면 getAttribute() 함수 이용해서 획득!
console.log(link1.getAttribute("href")); // http://www.google.com

// 🔑 속성(attribute) 변경
let link2 = document.getElementById("link--2");
// >> 바로 .으로 불러올 수도 있다.
// link2.href = "http://www.naver.com";

// >> 아니면 setAttribute() 함수 이용해서 설정!
link2.setAttribute("href", "http://www.naver.com");

// 🔑 속성 제거
let link3 = document.getElementById("link--3");
link3.removeAttribute("href"); // 밑줄 사라짐 -> 더이상 하이퍼링크 ❌
console.log(link3.hasAttribute("href")); // false

link3.remove(); // 💥이 코드는 DOM에서 link3 요소 자체를 삭제해버림!
