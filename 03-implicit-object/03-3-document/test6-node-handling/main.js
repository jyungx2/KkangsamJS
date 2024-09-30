"use strict";

let result1 = document.getElementById("result1");

result1.innerHTML = '<div><a href="#">link</a>hello</div>';

// 위와 동일하게 Node를 Create해서 추가..
let newDiv = document.createElement("div");

let newA = document.createElement("a");

let newAHref = document.createAttribute("href");
newAHref.value = "#";
// 어차피 newA에 추가할 거면 setAttribute() 함수 사용하는게 더 간편✅
// newA.setAttribute('href', '#')

// newA.setAttribute(newAHref);
console.log(newA);

let newAText = document.createTextNode("link");
let newDivText = document.createTextNode("hello");

newA.setAttributeNode(newAHref);
// 🚨 setAttribute가 아닌, setAttributeNode로 추가해줘야 에러 안뜬다!!
newA.appendChild(newAText);

newDiv.appendChild(newA);
newDiv.appendChild(newDivText);

let result2 = document.getElementById("result2");
result2.appendChild(newDiv);
