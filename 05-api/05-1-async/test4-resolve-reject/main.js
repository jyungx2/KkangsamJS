"use strict";

// JS에서 에러 핸들링 구문..
// 코드가 실행되다가 얼마든지 에러가 발생할 수 있다..
// 에러상황이면 프로그램이 종료되지만, 에러가 발생했다고 하더라도,
// 정상적으로 프로그램을 실행시키기 위한 기법이 존재한다.

try {
  // 정상적으로 실행되어야 하는 코드..
  console.log("1");
  throw new Error("my error..."); // 1️⃣ 에러가 발생되었다고 가정
  // catch 구문에 존재하는 2가 출력됨!
  console.log("1-1");
  // 에러가 발생한 라인의 코드부터 Try의 밑 부분은 실행되지 않고, 바로 catch 구문으로 이동
} catch (e) {
  // try에서 에러가 발생될 때 자동 호출.. 에러 대응 코드
  // 혹시 try에서 발생하면 실행된다. 무조건 실행❌
  console.log("2");
}
console.log("3");

// 1️⃣ 1 2 3 출력
// 1️⃣처럼 throw new Error없다면 1 3 만 출력!

// promise... 비동기 실행 후 결과 전달할 필요 없는 경우
/*
function myFun1() {
  return new Promise(() => {
    let interval = setInterval(() => {
      console.log("in promise");
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, 3000);
  });
}
console.log("step1");
myFun1();
console.log("step2"); // myFun1()은 비동기 업무를 처리하는 함수인 new Promise를 리턴하기 때문에 step2가 먼저 출력된 후, Promise함수 실행.
*/

/*
// test2... promise 결과 데이터'만' 발행, 획득하고자 한다면? (에러 X)
function myFun2() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 1000); // 1초 뒤에 10이라는 데이터(결과)를 발행하는 resolve 함수.
    // Promise는 이 resolve함수를 매개변수로 받는 함수이다.
  });
}

// 결과값을 활용하기 위해선 비동기 업무를 처리하기 위해 Promise함수를 리턴한 myFun2() 함수 상에 then()함수를 불러와, 매개변수로 결과 데이터를 사용할 수 있다.
// value = resolve함수가 발행한 데이터인 10
myFun2().then((value) => console.log(`result: ${value}`));
*/

// test3... 결과 뿐만 아니라, '에러'까지 발행, 획득하고자 한다면?
function myFun3(num) {
  return new Promise((resolve, reject) => {
    if (num > 0) resolve(num * num);
    else reject("0보다 큰수를 지정하세요..");
  });
}

// 데이터 뿐만 아니라 에러까지 획득해야 하기 때문에 callback 함수가 2개여야 함!
myFun3(10).then(
  (value) => console.log(`result : ${value}`), // 결과 데이터 수령하여 활용(컨솔로그로 찍음)하는 함수 (resolve 실행 시에 호출되는 함수)
  (error) => console.log(error) // 에러 수령하여 그대로 출력 (reject 실행 시에 호출되는 함수)
);
// result : 100

myFun3(-1).then(
  (value) => console.log(`result : ${value}`),
  (error) => console.log(error)
);
// 0보다 큰수를 지정하세요..

// 위에서 콜백함수를 2개나 입력하는 것은 매우 난잡함!!(지금은 괜찮아보이지만, 딱히 코드를 입력하지 않아서 그런것 ㅎ)
// => error만 별도로 catch에 등록하자
myFun3(10)
  .then((value) => console.log(`result : ${value}`)) // catch 실행시 실행❌
  .catch((error) => console.log(error)) // then 실행시 실행❌
  .finally(() => console.log(`finally 부분 실행...`));
// finally는 then이 실행됐든, catch가 실행됐든 항상 마지막에 무조건 실행되므로,
// 마지막에 공통으로 실행되어야 하는 코드를 Finally 함수에 써준다.

// result : 100
// finally 부분 실행...

myFun3(-1)
  .then((value) => console.log(`result : ${value}`)) // catch 실행시 실행❌
  .catch((error) => console.log(error)) // then 실행시 실행❌
  .finally(() => console.log(`finally 부분 실행...`));
// 0보다 큰수를 지정하세요..
// finally 부분 실행...
