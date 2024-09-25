"use strict";

function User(name) {
  this.name = name; // 개인(객체) 데이터
  // 일반적으로는 this상에 개인데이터를 선언할 일이 훨씬 많다!!
  User.prototype.point = 20; // 공용(프로토타입) 데이터
  User.prototype.sayHello = function () {
    console.log(`Hello, ${this.name}, ${this.point}`);
  };
}

let user1 = new User("hoggildong");
user1.sayHello(); // Hello, honggildong, 20

let user2 = new User("이길동");
// ✨user2만을 위한✨ 변수 교체
user2.point = 30;
// ✨user2만을 위한✨ 함수 교체 => 알고리즘 교체
user2.sayHello = function () {
  console.log(`안녕하세요 ${this.name}, ${this.point}`);
};

user2.sayHello(); // 안녕하세요 이길동, 30
// 바뀐 값으로 출력!!

// 객체를 새로 만들어서 함수 출력한다면, 얘만을 위한 개인 객체 sayHello()함수는 없기 때문에 prototype에서 공유하는 함수로 출력됨..
let user3 = new User("kimgildong");
user3.sayHello(); // Hello, kimgildong, 20
