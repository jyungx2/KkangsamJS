"use strict";

function User1(name) {
  this.name = name; // 객체마다 따로따로 유지되어야 하는 멤버
  // 각각의 객체에 함수 선언
  this.sayHello = function () {
    console.log(`Hello, ${this.name}`);
  };
}

let user1 = new User1("홍길동");
let user2 = new User1("이길동");

user1.sayHello(); // Hello, 홍길동
user2.sayHello(); // Hello, 이길동

// user1과 user2에 있는 sayHello는 동일함수인가?
console.log(user1.sayHello == user2.sayHello); // false
// 각각 다른 객체(user1, user2)에 정의됐으므로?
// => 함수 로직이 동일함에도 불구하고, false로 나왔다는 것은 선언된 위치가 달라서일까요?
console.log(user1.sayHello() == user2.sayHello()); // true = 리턴값을 호출하면 둘은 같다.. 이 함수의 리턴값은 설정해주지 않아 undefined이므로 true가 나오는 것. 🚨컨솔값 =/= 리턴값!!!🚨

function User2(name) {
  this.name = name;
  //   프로토타입에 함수 선언
  User2.prototype.sayHello = function () {
    console.log(`Hello, ${this.name}`);
  };
}
let user3 = new User2("홍길동");
let user4 = new User2("김길동");
user3.sayHello();
user4.sayHello();

// user1과 user2에 있는 sayHello는 동일함수인가?
console.log(user3.sayHello == user4.sayHello); // true
// 모든 객체가 공유할 수 있는 생성자 함수의 prototype 내부에 선언됐으므로??

console.dir(user1);
console.dir(user2);
console.dir(user3);
console.dir(user4);
