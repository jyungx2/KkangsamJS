"use strict";

/*
// TEST1) async로 함수 선언..
// 비동기적으로 실행될 함수 (호출한 곳을 대기하지 않게 하고자 하는 함수..)
// - function declaration
async function myFun1() {
  setTimeout(() => console.log("myFun1 call.."), 2000);
}

// - function expression
let myFun2 = async () => {
  setTimeout(() => console.log("myFun2 call.."), 1000);
};

console.log("step1");
myFun1();
console.log("step2");
myFun2();
console.log("step3");

// step1
// step2
// step3
// myFun2 call.. (1 sec)
// myFun1 call.. (2 sec)
*/

// TEST2) Promise (콜백헬에 빠질 만큼 복잡) vs Async (코드 간결)
/*
function myFun3() {
  return new Promise((resolve) => {
    resolve(1);
  });
}
myFun3().then((value) => console.log(value)); // 1

// Promise와 목적 동일(비동기 업무 처리), 어느 순간에 데이터발행은 리턴으로
async function myFun4() {
  return 2;
}
myFun4().then((v) => console.log(v)); // 2
*/

// TEST3) Promise 데이터 반복적으로 실행 획득
// 실제로는 비동기 업무 처리 함수가 꽤 많기 때문에 Promise함수로 다 다룬다면 코드가 굉장히 복잡해질 것이다.

function getData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${id} data`), 1000);
  });
}

/*
function myFun5() {
  getData(1) // 이 함수에 대한 결과값 받기 위해 Then() 함수 이용
    .then((value) => {
      console.log(value);
      return getData(2); // 시간이 오래 걸리는 함수를 또 호출
    })
    .then((value) => {
      // getData(2)에 대한 결과 데이터 GET
      console.log(value);
      return getData(3); // id = 3일 때의 결과값도 얻고 싶다면 또 리턴..
    })
    .then((value) => {
      console.log(value);
    });
}


myFun5();
// 1초마다 아래 코드가 차례로 출력.
// 1 data
// 2 data
// 3 data
*/

/*
// then()으로 promise를 이용하는 함수를 아래처럼 await으로 작성 가능..
async function myFun6() {
  console.log(await getData(1)); // 🚨 함수 선언시 async쓰지 않으면 에러 발생.
  console.log(await getData(2));
  console.log(await getData(3));
}
myFun6();
// 결과 데이터는 위의 myFun5() 돌렸을 때와 동일하게 출력.
// myFun5() : then, then, then... 너무 복잡!! 콜백헬!!! --> await으로 해결하자.
*/

// TEST4) 비동기적으로 실행시켜야 하는 함수가 여러개 있다고 가정...
function funA() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("funA data"), 2000);
  });
}

function funB() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("funB data"), 1000);
  });
}

/*
// 📌 await 이용 + but 동시에 함수 실행시키지 않음
async function myFun7() {
  console.time();
  let aData = await funA(); // 2 sec 기다림.
  console.log(aData);
  let bData = await funB(); // 1 sec 기다림.
  console.log(bData);
  console.timeEnd(); // 이 함수가 몇초만에 끝났는지 테스트하기 위해 시간 출력
}
myFun7(); // default: 3.008...ms // 총 3초.
*/

// 📌 await을 이용 + 동시에 함수를 실행시켜 시간을 더 단축시키고 싶다면..
// 여러 함수가 "동시에 진행되어도" 된다는 가정.. (금융권 정보, 날씨 정보를 동시에 겟할 수 있잖아!?)
// 모든 결과 데이터를 획득만 하면 된다는 가정..
/*
async function myFun8() {
  console.time();
  // 함수 호출에 await이 아니라 🌟결과 데이터🌟에 Await
  // 함수는 동시 진행해도 상관없는 경우에 가능!
  let aData = funA();
  let bData = funB(); // 결과 데이터를 모두 준비해 놓는 것.
  console.log(await aData); // 기다렸다가 결과 출력할 때 같이 출력!
  console.log(await bData); // 가장 오래 걸리는 업무가 2초이고 결과데이터들은 위에서 미리 준비했으므로, 2초만에 출력 가능
  console.timeEnd();
}

myFun8(); // default: 2005.055.... ms // 총 2초밖에 안 걸림!
*/

// 📌 Promise.all() 사용해 데이터 모두 동시에 리턴 받기
// 처리해야 할 함수가 너무 많다면 All이 더 편할 것.
async function myFun9() {
  console.time();
  // 비동기 함수를 여러개 호출, 동시 진행하는 경우 all()을 이용할 수도..
  Promise.all([funA(), funB()]).then((value) => {
    console.log(value); // ['funA data', 'funB data']
    // ✨무조건 all()의 매개변수는 iterable 형태의 데이터여야 한다 (array, map, set...)✨
    console.timeEnd(); // default: 2003.30810 ms
    // Promise.all()안에 작성한 이유: promise가
  });
}
myFun9(); //
