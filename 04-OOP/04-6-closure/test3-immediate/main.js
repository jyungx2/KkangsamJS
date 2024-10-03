"use strict";

// 일반 함수 선언과 이용..
function myFun(name) {
  console.log("myFun call");
}

// 선언과 호출은 별개..
// 원하는 만큼 반복 호출 가능..
myFun("홍길동");
myFun("김길동");

// 즉시 실행 함수..
// 선언과 동시에 호출.. 이름을 가지지 않기 때문에 반복호출불가
(function (name) {
  console.log("Hello");
})("홍길동"); // Hello 매개변수 있다면 매개변수 써줌!

// 1) 특정 변수, 함수의 이용범위를 한정짓고 싶을 때..
// 주로 라이브러리 코드 내에서 사용
// 대부분의 라이브러리 코드는 첫줄서부터 끝줄까지 ()로 묶여 있음.
(function () {
  let data = 10;
  function fun1() {}
})();

// data = 20;
// fun1();

// 특정 변수가 있는데, 몇몇 함수에서만 사용되게 강제하고자 할 때..
/*
function increment() {
  let count = 0;
  count++;
}
function decrement() {
  count--;
}

increment();
increment();
decrement();
console.log(count); // 1


// increment, decrement에서 사용되는 데이터가 다른 코드 어디선가에서 다른 의미로 사용되는 것을 방지할 수 없게 된다.
count = 100;
increment();
console.log(count); // 101
*/

const counter = (function () {
  let count = 0; // 이 변수는 내부적으로 클로저에 담겨져 이용가능
  // 카운터는 클로저에 의해 유지가 되지만, 외부에서 사용불가
  return function (argFun) {
    count = argFun(count);
    return count;
  };
})();
// counter라는 함수를 실행하자마자 바로 리턴
// 리턴 함수가 바로 실행됨.

let increment = (no) => ++no;
let decrement = (no) => --no;

console.log(counter(increment)); // 1
console.log(counter(increment)); // 2
console.log(counter(decrement)); // 1

// let count = 100;
