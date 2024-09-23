"use strict";

let area1 = document.getElementById("area1");
let area2 = document.getElementById("area2");
let area3 = document.getElementById("area3");

// (DOM) node tree에 유지되는 css 정보는 인라인 스타일만...
console.log(area1.style.width); // 200px
console.log(area2.style.width); // ""
console.log(area3.style.width); // ""

// css 속성명 -> camel Case로 이용
console.log(area1.style.height); // 200px
console.log(area1.style.backgroundColor); // green
console.log(area2.style.backgroundColor); // ""
console.log(area3.style.backgroundColor); // ""

// node의 Css 속성 값 변경..
area1.addEventListener("click", function () {
  area1.style.backgroundColor = "yellow";
  area1.style.borderRadius = "50%";
});

// inline style이 아닌, 외부에 선언되어 적용된 css 값을 획득한다면?
// => style 태그 혹은 외부 css 파일..
// 외부 파일로 저장된 css 밸류는 dom tree에 올라오지 않고, 별도의 메모리에 저장돼서 노드의 스타일 속성을 이용하지 못한다.(document.style❌)
console.log(getComputedStyle(area1).width); // 200px
console.log(getComputedStyle(area2).width); // 200px
console.log(getComputedStyle(area3).width); // 200px

area2.addEventListener("click", function () {
  area2.style.backgroundColor = "yellow";
  // css파일 내 스타일링을 수정하는 것이 아닌(불가능한 설정), 덮어쓰기하는 것. css 우선순위는 inline-style로 스타일링하는 것이 가장 높기 때문에 이렇게 설정하면 외부 css파일을 override하여 덮어씌우기 가능.
  area2.style.borderRadius = "50%";
});

// Node
// .innerHTML: body 부분을 한꺼번에 선택하여 변경할 때 쓰이는 속성
// .createElement(): insertAdjacentHTML()은
