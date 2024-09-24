"use strict";

// 일반 함수 선언.. This로 멤버준비되지 않은 경우

function User1(arg1, arg2) {
  // 함수 내 변수와 함수 선언 -> 함수 scope내에 선언된 함수의 로컬 멤버
  let name = arg1;
  let age = arg2;
  let sayHello = function () {
    console.log(`User1, ${name}, ${age}`);
  };
  sayHello();
}

// 📌 일반 함수 호출
User1("홍길동", 20); // User1, 홍길동, 20
// 함수가 일반 함수로 준비되어 있기 떄문에 정상작동.

// 📌 객체 생성으로 호출
// new를 이용했기 때문에 this(메모리)는 준비된다.
// 하지만 함수 내에서 This.xxx로 This에 아무것도 추가되지 않은 상태다. 즉 빈상태의 객체이다.
// 그 객체 내에는 name과 age도, sayHello() 함수도 없다.
let obj1 = new User1("홍길동", 30); // User1, 홍길동, 30 (이건 단지 함수 내 컨솔로그가 실행된 것!)

console.log(`${obj1.name}, ${obj1.age}`); // 빈 객체 내에 Name, age 아무것도 없다.
// obj1.sayHello(); // 빈오브젝트에 sayHello()가 없는데 불러오니까 에러 발생

// 생성자 함수로 준비...
function User2(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function () {
    console.log(`${this.name}, ${this.age}`);
  };
}

// 📌 일반 함수처럼 이용
// new를 사용하지 않아 this가 준비/정의 x => 함수 내용은 몽땅 this상에 정의되고 있으므로 에러 발생
// User2("홍길동", 20); // 🚨

// 📌 객체 생성으로 이용
// 모형(생성자함수)을 선언하고, 모형을 통해 동일 구조의 객체를 반복 생성..
let user1 = new User2("홍길동", 25);
let user2 = new User2("김길동", 30);
console.log(user1);
console.log(user2);

user1.sayHello(); // 홍길동, 25
user2.sayHello(); // 김길동, 30

// 📌 생성자 함수와 리턴.......
// 생성자 함수가 New로 호출이 되면 함수 내에서 명시적으로 return시키지 않아도 생성된 객체가 리턴
function User3(name, age) {
  this.name = name;
  this.age = age;
  return 10; // 👉 기초 데이터(10) 리턴시키면 무시되고 생성된 객체가 반환된다..
}
let user3 = new User3("jiyoung", 26);
console.log(user3); // User3 {name: 'jiyoung', age: 26}
// 👉 오직 객체만 반환!

// 명시적으로 코드에서 준비한 다른 객체를 리턴시킨다면..
function User4(name, age) {
  this.name = name;
  this.age = age;
  // 다음과 같이 데이터가 아닌 객체를 리턴하면,
  // new 연산자에 의해 생성된 객체는 무시되고, 리턴시킨 객체가 반환..
  return {
    prodNo: 1,
    prodName: "에어조던",
  };
}

let user4 = new User4("홍길동", 30);
console.log(user4); // {prodNo: 1, prodName: '에어조던'}

// 외부에서 객체 멤버 추가.....
// dir: DOM 객체를 보기 좋게 출력함
console.dir(user1);
console.dir(user2);

user1.address = "seoul";
user1.helloFun = function () {};

// 위에서 user1에 address, helloFun함수를 추가했으므로
// 동일한 생성자 함수로 생성된 객체라 하더라도 객체별 멤버가 달라진다.
console.dir(user1);
console.dir(user2);
