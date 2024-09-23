"use strict";

// 객체 선언.. object literal 기법으로..
let user = {
  name: "홍길동",
  age: 20,
  isMember: true,
  // 📌 객체 내에 객체..
  order: {
    productId: 2,
    count: 10,
  },
  // 📌 함수 멤버 -> 메서드..
  sayHello: function () {
    console.log(`Hello, ${this.name}`);
  },
  // 📌 객체 내에서 ✨자신의 다른 멤버(변수, 함수)✨를 이용하려면 this 예약어로.. 이용해야..
  // this는 예약어, 어떤 객체 내에서 ✨자기 자신✨을 지칭하는 예약어..
  sayHello1: function () {
    console.log(`Hello, ${this.name} - ${this.age}`);
  },
  // 📌 화살표 함수
  // > 객체 내에 함수를 화살표 함수 자체로 선언하는 것은 문제가 되지 않는다.
  // 화살표 함수 내에서 this가 객체 자신을 지칭하지 못한다는 문제..

  // > 화살표함수는 함수를 간단하게 선언해서 이용하는 경우 주로 사용,
  // this를 사용하지 않는 경우에 사용할 것을 권장..
  sayHello2: () => {
    console.log(`Hello ${this.name}, ${this.age}`);
  },
};

// 📌 선언된 객체 멤버 접근..
// 객체의 멤버 접근은 .으로..
console.log(user.name);
console.log(user.order.productId);
user.sayHello();
user.sayHello1(); // age is not defined. => this.age 로 바꿔주자
user.sayHello2(); // Hello, undefined

// 📌 축약으로 멤버 선언..
let name = "김길동";
let age = 30;

let user1 = {
  name, // window 객체 상에 내장돼있는 name 프라퍼티가 존재하므로 헷갈릴 수 있어 권장❌
  age,
  sayHello: function () {
    console.log(`${this.name}, ${this.age}`);
  },
};
user1.sayHello(); // 김길동, 30

// 📌 객체 선언할 때는 없던 멤버를 외부에서 추가 가능...
user1.address = "seoul";
user1.sayHello2 = function () {
  console.log(`${this.name}, ${this.age}, ${this.address}`);
};
user1.sayHello2(); // 김길동, 30, seoul
