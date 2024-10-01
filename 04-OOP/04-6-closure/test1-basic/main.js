"use strict";

// TEST1) Execution context
/*
let x = 10; // breakpoint💥

function oneFun() {
  let y = 20;
  console.log(x, y); // 실행되는데 전혀 문제 없는 코드
}

function twoFun() {
  let z = 30;
  console.log(x, z); // 실행되는데 전혀 문제 없는 코드
}

console.log(x); // 1️⃣ 첫번째 버튼 누르면 위의 함수는 그냥 무시하고, 이곳으로 점핑됨.
oneFun(); //  1️⃣ 첫번째 버튼 누르면 또 일로 옴. + 2️⃣ 두번째 버튼 누르면 oneFun()함수 안으로 들어감 (call stack - oneFun 나타남, anonymous: 글로벌 컨텍스트인 것을 알 수 있음?..)
twoFun(); // 위에서 첫번째 버튼 3번?정도 누르면 콜스택에서 oneFun 함수가 사라지고,(실행 끝나서 스택에서 완전히 날라가버림) 이 코드로 점핑됨. + 두번째버튼 눌러서 함수를 첫번째 버튼으로(1️⃣) 쭉쭉쭉 실행시키면 바로 밑의 x 출력코드로 이동함.
console.log(x);

// * break point: 특정위치까지만 실행되도록 중단점을 걸어 디버깅하는 기법
// 👀 컨솔 상에 출력되는 에러메시지를 우선적으로 확인하고, 그 다음 브레이크 포인트를 써서 하는게 조금 더 쉽게 디버깅할 수 있는 방법 ㅎㅎ..
*/

// TEST2) Closure가 필요 없는 상황..
/*
let x = 10; // breakpoint💥

function outerFun() {
  let y = 20; // 2️⃣

  function innerFun() {
    let z = 30; // 4️⃣ innerFun()함수 실행하는 동안 outerFun, global context모두 콜스택에 남아있으므로(=콜스택 상에서 outerFun위에서 innerFun이 실행되고 있으므로), execution context 정보로부터 x, y, z 에 대한 밸류 충분히 얻을 수 있음! => closure 필요 ❌
    console.log(x, y, z); // x, y, z를 컨텍스트 정보에서 얻을 수 있으면 클로저 굳이 필요없고, 그게 아니라면 클로저 생성하여 그곳에 저장한 다음에 불러오게 된다.
  }
  innerFun(); // 3️⃣ 
}

outerFun(); // 1️⃣
*/

// TEST3) Closure가 필요한 상황..
// Closure: 내부 함수가 외부 함수의 변수에 접근할 수 있도록 만들어진 스코프 체인
// 함수의 lexical정보가 따로 유지되어야 하는 상황..
let x = 10; // breakpoint💥

function outerFun() {
  let y = 20;
  function innerFun() {
    // innerFun()에 대한 클로저가 만들어져 outerFun() 함수의 실행이 끝났음에도 불구하고, innerFun()실행에 필요한 y변수를 사용할 수 있게끔 해줌.
    let z = 30;
    console.log(x, y, z);
  }
  return innerFun;
}

let resultFun = outerFun(); // innerFun() 리턴
resultFun(); // innerFun() 호출시키는 것과 다름 없다. 근데 이 시점에는 이미 OuterFun() 함수가 호출이 끝나고 콜스택에서 사라진 후!! => 이때, y=20이라는 정보를 execution context 정보로 찾지 못하므로, (콜스택에 없으니까 = 이 코드까지 breakpoint사용해서 왔을 때, 호출 스택(Call stack)에 (익명)=Global context밖에 남지 않음 = OuterFun()은 사라져버림)
// 이때, JS는 자동으로 클로저가 만들어져 y 변수를 써야한다는 걸 인지해서 클로저에 할당하여, y값을 resultFun() 실행했을 때 사용될 수 있도록 함.
