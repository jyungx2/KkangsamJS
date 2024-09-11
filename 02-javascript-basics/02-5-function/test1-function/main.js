// test1... 함수 선언 및 이용...
console.log("step1");

// 📌 아래 함수는 선언구문이지 실행구문이 아니다.
// 선언자체로 함수의 Body가 실행되지는 않는다.
// 어디선가 이 함수를 호출해야 실행된다..
function myFun1() {
  console.log(`execute function body`);
}

console.log("step2");

// 📌 함수 호출! -> 8번 코드에 execute function body 출력!
// ⭐️ 함수가 호출이 되면 함수부분이 모두 실행이 끝나야 밑줄이 실행 ⭐️
// => 매우 중요한 함수 Flow !!!
myFun1();
console.log("step3");
// 📌 함수는 일종의 코드 재사용이다.. (여러 줄의 코드를 다시 쓸 필요 없이 함수만 띡 선언하면 되니 을매나 편하게요?)
// 함수를 하나 선언하고.. 그 함수의 업무(ex. Login필요 시마다 이 함수 쓰면 됨!)가 필요한 곳에서 반복호출 (재사용)
myFun1();

// 📌 argument, return value
function myFun2(arg1, arg2) {
  console.log(`arg1 : ${arg1}, arg2 : ${arg2}`);

  if (arg1 < arg2) {
    return arg1; // 코드 실행 중, 리턴을 만나면 바로 함수 종결!
  } else {
    return arg2;
  }
}
myFun2(); // arg1 : undefined, arg2 : undefined
// 다른 언어에서는 바로 에러가 뜨지만 자바스크립트는 그냥 undefined로 출력!
myFun2(10); // arg1 : 10, arg2 : undefined

myFun2(10, 20); // arg1 : 10, arg2 : 20 (이 매개변수들은 어떤 인수를 넣어야하나?? -> 실무에서 제공되는 실전매뉴얼에 의해 인수 삽입)

let result = myFun2(10, 20);
console.log(result); // 10;

// 📌 default parameter
function myFun3(arg1, arg2 = 0) {
  console.log(`arg1 : ${arg1}, arg2 : ${arg2}`);
}
myFun3(); // arg1 : undefined, arg2 : 0 (<- undefined)
myFun3(10); // arg1 : 10, arg2 :  0 (<- undefined)
myFun3(10, 20); // arg1 : 10, arg2 : 20

function myFun4(arg1, ...arg2) {
  console.log(arg1);
  // rest parameter는 배열..
  if (arg2.length > 0) {
    for (let i = 0; i < arg2.length; i++) {
      console.log(`arg2[${i}] = ${arg2[i]}`);
    }
  }
}

myFun4(10, 20); // 10 | arg[0] = 20;
myFun4(10, 20, 30, 40, 50); // 10 | arg2[0] = 20 | arg2[1] = 30 | arg2[2] = 40 | arg2[3] = 50
