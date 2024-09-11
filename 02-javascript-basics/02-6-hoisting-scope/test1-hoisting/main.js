"use strict";

// 📌 Test1 - var hoisting test
// 아래 선언된 변수를 위에서 쓸 수 있지만, 값이 할당되기 전까진 Undefined(선언이 돼있는데, 값이 할당이 안돼있는 것으로, not defined와는 다르다.)라고 나옴.
console.log(`step1, data1 = ${data1}`);
// step1, data1 = undefined
data1 = 20;
console.log(`step2, data1 = ${data1}`);
// step2, data1 = 20
var data1 = 10;
console.log(`step3, data1 = ${data1}`);
// step3, data1 = 10

// 📌 Test2 - let / const hositing test
// console.log(data2); // 🚨 호이스팅 지원 X
// console.log(data3); // 🚨 호이스팅 지원 X
let data2 = 10;
const data3 = 30;

// 📌 Test3 - 함수 호이스팅 test
console.log(myFun1()); // myFun1 call (hoisting 지원 🆗)
function myFun1() {
  return "myFun1 call";
}

// console.log(myFun2()); // 🚨 호이스팅 지원 X
// Cannot access 'myFun2' before initialization
const myFun2 = () => {
  return "myFun2 call";
};

// 💡 var로 함수를 선언하면 호이스팅이 가능할까??
// console.log(myFun3()); // 🚨 myFun3 is not a function
// var로 선언하면 호이스팅이 되기는 하지만, 선언부분만 위로 올라가고
// 값이 할당되기 전까지는 Undefined 상태이기 때문에
// => undefined의 타입예측 불가 => 함수로 인식하지 않고 따라서 실행❌
var myFun3 = () => {
  return "myFun2 call";
};
