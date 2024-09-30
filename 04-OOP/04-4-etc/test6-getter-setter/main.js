"use strict";
/*
let obj = {
  // 이 값이 변경되는 순간 운용 로그를 남겨야 한다는 유지보수 사항이 발생했다면.. (이 값 자체가 너무 중요한 애여서 기록을 남겨야 함)
  num: 10,

  // 운용 로그(=> 코드 => 함수로 감싸야 함): 운영자들이 파악하기 위함이라 컨솔에 출력하진 않지만 어쨌든..
  // 변수를 함수처럼 사용할 수 있도록 쓰는 것이 Getter, setter
  setNum: (value) => {
    console.log(`어디선가 값 변경을 시도합니다.`);
  },
};

obj.num = 20; // 💫obj.setNum(20) 이렇게 다 바꿔줘야함!
console.log(obj.num);
*/

let obj1 = {
  num: 0,
  get num() {
    return this._num;
  },

  set num(value) {
    this._num = value;
    console.log(`운용로그를 남깁니다.`); // 요구사항을 충족하기 위해 이 부분만 추가하면 됨! (밑에 obj1.num = 20 부분을 위에서처럼 함수로 고칠 필요 X -> 함수 역할을 하지만, 프라퍼티처럼 쓸 수 있기 때문!!💫)
  },
};

obj1.num = 20;
console.log(obj1.num);
