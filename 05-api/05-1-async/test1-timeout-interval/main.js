"use strict";

// function sayHello() {
//   // 시간 측정할려고..
//   console.timeEnd(); // default: ~ms 형식으로 출력
//   console.log("Hello");
// }

// // 📌 setTimeout()
// // 즉시 실행..
// console.time(); // timeEnd에서 걸린 시간 출력..
// // setTimeout(sayHello); // delay타임 주지 않아, 즉시 실행

// 1초 후에 실행
// setTimeout(sayHello, 1000);

// 데이터 전달..
// 함수를 직접 실행시키는 것이 아니라.. 의뢰하는 것임으로 의뢰내용에 데이터를 전달해야 한다.
// function sayHello2(arg1, arg2, arg3) {
//   console.log(`Hello, ${arg1}, ${arg2}, ${arg3}`);
// }

// setTimeout(sayHello2, 1000, "홍길동", 10, true);

// 의뢰.. 취소.....
// function sayHello3() {
//   console.log("Hello");
// }

// // 몇개라도 등록.. 하나하나 식별자가 리턴.. 취소를 위해서는 식별자 필요하다.
// let id = setTimeout(sayHello3, 1000);
// clearTimeout(id); // 1초 후에 실행하라고 썼는데 바로 Clear(취소)하라고 했으니 아예 안찍은 거랑 동일한 것.

// // 📌 setInterval..
// function fun1(name) {
//   console.log(`fun1, ${name}`);
// }
// let id2 = setInterval(fun1, 1000, "홍길동");
// setTimeout(() => clearInterval(id2), 3000); // 3번 출력후 인터벌 멈춤.

// 0.5초 걸리는 업무를 진행하는 함수를 1초마다 반복 호출..
// 일부러 시간을 지연시키기 위한 목적
function sleep(sec) {
  // 매개변수 시간 후에 결과 리턴..
  return new Promise((resolve) => setTimeout(resolve, sec));
}

let beforeTime = performance.now();
// 성능: 얼마나 빨리 코드가 실행되냐의 시간

// let sayHello2 = async () => {
//   let nowTime = performance.now(); // 현재 코드가 실행되는 시각
//   console.log(nowTime - beforeTime);
//   beforeTime = nowTime;
//   await sleep(500); // 0.5초 쉬고... 업무처리하는데 5초정도 걸리는 업무가 있다고 할때..
// };

// let id3 = setInterval(sayHello2, 1000);
// setTimeout(() => clearInterval(id3), 3000);
// 업무가 1초마다 실행된 것이 아니라 함수 호출 자체가 1초마다 된다.

// 0.5초 걸리는 업무를 진행한 후에 1초 후에 다시 업무 진행..
let id = 0;
let sayHello = async () => {
  let nowTime = performance.now();
  console.log(nowTime - beforeTime);
  await sleep(500); // 0.5초 입
  /// 밑줄 실행되엇다는 것은 윗줄의 실행이 끝나는 것..
  setTimeout(sayHello, 1000);
};
setTimeout(sayHello, 1000);
