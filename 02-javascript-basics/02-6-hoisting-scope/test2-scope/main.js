"use strict";

// 📌 Test1 - 중복선언
// ✅ 동일 스코프에서 중복 선언은 var에 한해서만 지원된다.
var data1 = 10;
let data2 = 10;
const data3 = 10;
console.log(data1); // 10

var data1 = "홍길동";
console.log(data1); // 홍길동
// let data2 = "홍길동"; // 🚨 'data2' has already been declared
// const data3 = "홍길동"; //  🚨 'data3' has already been declared

// 📌 Test2 - 중복선언
// ✅ scope가 다른 위치에서 중복 선언..
// 스코프가 다르다면 변수 중복 선언 가능하다. let+const
// 변수명을 의미있는 단어로 주는 것이 기본임으로, 중복해서 local 변수를 자주 만들기 때문에
let data4 = "홍길동"; // Global scope

const myFun = () => {
  let data4 = "김길동"; // local scope
  console.log(`in function ${data4}`);
  // in myFun, data = 김길동
  // 👉 current scope에 있는 변수 우선 사용! (현재 스코프에 해당 변수가 없으면, 가장 마지막으로 global scope에서 찾아 사용하게 된다.)
};

myFun(); // 김길동 사용
console.log(myFun()); // undefined
console.log(`out function ${data4}`); // 홍길동 사용
// out function 홍길동 👉 global scope에 있는 변수 사용!

// 📌 Test 3 - 함수 중복 '선언'(const/let/var 붙여줌)
// 함수의 내용(body)을 바꿀 수 있는가?

// --------- 함수 선언식 ----------
// ✅ 동일한 함수의 내용을 바꿔치기할 수 있다!!
function myFun1() {
  console.log("step1");
}

function myFun1() {
  console.log(`step2`);
}

myFun1(); // step2
console.log(myFun1()); // undefined

// -------- var ----------
// ✅ 동일한 함수의 내용을 바꿔치기할 수 있다!!
var myFun2 = function () {
  console.log("step1");
};

var myFun2 = function () {
  console.log("step2");
};

myFun2(); // step2
console.log(myFun2()); // undefined

// --------- let ---------
// ⛔️ Const와 마찬가지로, 바꿔치기 불가능!!
let myFun3 = function () {
  console.log("step2");
};

// 🚨 선언식 함수와 Var에 대입되는 표현식 함수만 동일스콥내 중복선언이 가능!
// let myFun3 = function () {
//   console.log("step2");
// };

myFun3(); // step2
console.log(myFun3()); // undefined

// Test 4 - scope
// 모든 소프트웨어 언어에서는 하나의 scope({}) 내에 선언된 변수, 함수는 그 스코프 내에서만

// ------- var --------
// var name1 = "홍길동"; // global scope
// const someFun = () => {
//   var name1 = "김길동";
//   console.log(`in someFun 1, name1 = ${name1}`);
//   // 김길동

//   for (let i = 0; i < 1; i++) {
//     var name1 = "이길동";
//     console.log(`in someFun, name1 = ${name1}`);
//     // 이길동
//   }
//   console.log(`in someFun 2, name1 = ${name1}`);
//   // 이길동 => for loop block 무시하고 값 참조해버림!
//
//   if (true) {
//     var name1 = "박길동";
//     console.log(`in someFun, name1 = ${name1}`);
//   }
//   console.log(`in someFun 3, name1 = ${name1}`);
//   // 박길동 => if loop block안에서 바꾼 값 또 참조!
// };
// someFun();
// console.log(`out Function, name1 = ${name1}`); // 홍길동
// // 🖍️ 김길동이 아닌, 홍길동 출력! -> var은 함수 스코프'만' 지원한다.
// // for, if block은 지원하지 않는다.

// ------- let --------
// 💥 변수선언(name1)을 let으로 선언한다면?
let name1 = "홍길동"; // global scope
const someFun = () => {
  let name1 = "김길동";
  console.log(`in someFun 1, name1 = ${name1}`);
  // 💡김길동

  for (let i = 0; i < 1; i++) {
    let name1 = "이길동";
    console.log(`in someFun, name1 = ${name1}`);
    // 이길동
  }
  console.log(`in someFun 2, name1 = ${name1}`);
  // 💡김길동 (위 for loop block에서 바꿔준 이길동이 아님!)
  // 이 컨솔값은 원래 기존값 그대로 '김길동'이 유지됨...
  // ∵ let: for loop block안에 침범 ❌

  if (true) {
    let name1 = "박길동";
    console.log(`in someFun, name1 = ${name1}`);
    // 박길동
  }
  console.log(`in someFun 3, name1 = ${name1}`);
  // 💡김길동 (위 if block에서 바꿔준 박길동이 아님!)
  // ∵ let: if loop block안에 침범 ❌
};
someFun();
console.log(`out Function, name1 = ${name1}`); // 홍길동
