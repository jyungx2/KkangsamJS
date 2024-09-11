"use strict";

// 📌 Test1 - 중복선언
let data = "홍길동";

const myFun = () => {
  let data = "김길동";
  console.log(`in myFun, data = ${data}`);
  // in myFun, data = 김길동
};
console.log(myFun()); // undefined

// 📌 Test2 - 중복선언
// ✅ 동일 스코프에서 중복 선언은 var에 한해서만 지원된다.
var data1 = 10;
let data2 = 10;
const data3 = 10;

var data1 = "홍길동";
// let data2 = "홍길동"; // 🚨 'data2' has already been declared
// const data3 = "홍길동"; //  🚨 'data3' has already been declared

// ✅ scope가 다른 위치에서 중복 선언..
// 스코프가 다르다면 변수 중복 선언 가능하다. let+const
// 변수명을 의미있는 단어로 주는 것이 기본임으로, 중복해서 local 변수를 자주 만들기 때문에
let data4 = "홍길동"; // Global scope

const myFun2 = () => {
  let data4 = "김길동"; // local scope
  console.log(`in function ${data4}`);
  // in myFun, data = 김길동
  // 👉 current scope에 있는 변수 우선 사용! (현재 스코프에 해당 변수가 없으면, 가장 마지막으로 global scope에서 찾아 사용하게 된다.)
};

myFun();
console.log(`out function ${data4}`);
// out function 홍길동 👉 global scope에 있는 변수 사용!
