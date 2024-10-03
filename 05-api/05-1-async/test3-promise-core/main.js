"use strict";

// TEST 1) 동기 실행
/*
function myFun() {
  console.log("done...");
  return 10;
}

console.log("step1");
let result = myFun();
console.log("step2 : " + result);
// step1
// main.js:5 done...
// main.js:11 step2 : 10
*/

// TEST 2) 비동기 실행
function myFun() {
  // 호출되자마자 promise 객체를 리턴시켜서 함수를 호출한 곳이 대기상태가 되지 않게 한다..
  // promise의 매개변수는 시간이 오래 걸리는 업무를 처리하는 함수를 입력.
  // 함수를 호출한 곳에 진동벨 쥐어주고, 커피 제조중...
  return new Promise((resolve, reject) => {
    // 1초 후에 10이라는 데이터 발생..
    setTimeout(() => resolve(10), 1000);
  });
}
console.log("step1");

let promise = myFun();

// promise의 비동기 업무에 의한 결과가 발생할 때 실행될 함수를 등록
// 결과를 받을 함수를 실행시킨 것이 아니라 ✨등록만✨ 한거다..
// 실행은 비동기 ❗️업무에서 결과가 발생할 때❗️ 알아서 실행된다..
promise.then((result) => {
  // result(매개변수)가 promise쪽에서 발생시킨 데이터
  console.log(`result : ${result}`);
});
console.log("step2");

// step1
// step2 // result: 10보다 더 빨리 출력 -> promise.then의 결과 = result를 기다리지 않고, 일단 출력됨.
// result: 10 // return new Promise에서 1초 뒤에 10이라는 결과가 발생하는 것을 result로 받아 promise.then이 출력.
