"use strict";

// 📌 test1 - local variable vs global variable..
let data1 = 10; // global variable.

function myFun(arg1) {
  let data2 = 20;
  // 함수 내부에서 global, local variable 이용 가능..
  console.log(`${data1}, ${data2}, ${arg1}`);
}
myFun(30); // 10, 20, 30

// 함수 실행 끝난 이 위치에서 각각의 변수들에 접근해보자.
console.log(data1); // 10 (global variable)
// console.log(arg1); // 🚨 arg1 is not defined. (local)
// console.log(data2); // 🚨 data2 is not defined. (local)
// => global, local variable에 따른 결과값이 다르다!
// 함수 실행이 끝나면 메모리 상에 함수를 위해 잡았던 Execution context가 몽땅 사라져서 더 이상 배리어블이 정의되지 않았다고 판단함. => 그렇다고 전역변수가 무조건 좋다는 것은 아님!!

// 📌 Higher order function (함수를 매개변수로서 받거나, 함수를 리턴하는 함수)
// ------------------------ (1) -----------------------
// ❗️ 만약, 이 함수 외에, 다른 코드에서 사용이 안 된다면 굳이 이런 식으로 따로 정식으로 선언할 필요가 없기 때문에 Arrow function을 사용하면 더 간단☑️
function test1() {
  console.log("test1"); // test1
}
function test2() {
  console.log("test2"); // test2
}

// 함수를 매개변수 또는 리턴으로... 일반 선언식 함수도 가능하다.
function myFun2(arg) {
  arg(); // myFun함수가 매개변수로 들어온 '함수'를 호출
  return test2; // 위에서 선언한 test2 함수를 리턴!
}
let result = myFun2(test1); // 위에서 선언한 test1 함수를 매개변수로 집어넣음!
result();
// => myFun: higher-order fucntion.
// 이때, result 변수는 함수 자체로, 이 코드는 문제가 없이 실행됨.

// ------------------------ (2) -----------------------
// ❗️Arrow function은 따로 정의할 필요없이 바로 삽입 가능!
// 위 함수와 똑같은데, 이번에는 간단하게 화살표 함수를 바로 대입해서 표현한 것!
function myFun3(arg) {
  arg();
  return () => console.log("test2"); // test2
}
let result3 = myFun3(() => console.log("test1")); // test1
result3();
