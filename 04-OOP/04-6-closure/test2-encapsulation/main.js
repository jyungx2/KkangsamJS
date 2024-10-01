"use strict";

// TEST1) 아래의 생성자함수와 클래스는 전혀 캡슐화되어 있지 않다.
// 외부에서 객체의 데이터를 가지는 변수멤버에 직접 접근하고 있어 유지보수성이 떨어진다.

// // - 생성자함수
// function UserFunction() {
//   this.name = "홍길동";
//   this.age = 10;
// }

// let obj1 = new UserFunction();
// obj1.name = "김길동";
// obj1.age = 20;

// console.log(obj1.name, obj1.age); // 김길동 20

// // - 클래스
// class UserCl {
//   constructor() {
//     this.name = "홍길동";
//     this.age = 10;
//   }
// }
// let obj2 = new UserCl();
// obj2.name = "이길동";
// obj2.age = 30;

// console.log(obj2.name, obj2.age); // 이길동 30

// TEST2) 캡슐화를 적용하여 멤버 변수가 외부에 노출되지 않게 한다.
// 즉, 변수를 직접적으로 사용하지 못하게 하되, '함수'를 이용해 변수 값 변경과 획득이 가능하도록 하여 유지보수성을 높이자.

// - 생성자함수
function UserFunction() {
  // 생성자 함수 내에 변수가 선언되었지만, this.으로 선언하지 않았다..
  // 생성되는 객체에 담기지 않는다. 로컬변수이기 때문에 외부에서 이용 못한다.
  let name = "홍길동";
  let age = 10;
  // 이 값을 객체에 유지했다가 함수를 통해 이용하도록..
  // 외부에서 이용하는 함수 내에 lexical 정보로 유지되게..
  this.getName = function () {
    return name; // name은 바깥 생성자 함수에 정의돼있으므로, 이 값을 사용하려면 Closure가 만들어져야 함!
  };

  this.setName = function (value) {
    name = value;
  };

  this.getAge = function () {
    return age;
  };

  this.setAge = function (value) {
    age = value;
  };
}
// 생성자함수에서 데이터를 프라이빗하게 유지하려면 내부적으로 클로저를 이용해서 구현하면 됩니다.
//

let obj1 = new UserFunction();
obj1.name = "김길동";
obj1.age = 20;

console.log(obj1.name, obj1.age); // 김길동 20

// - 클래스 : ES6에서 기본적으로 #을 제공하여 데이터를 Private하게 만들 수 있는 기능을 이용하자
class UserCl {
  #name = "홍길동";
  #age = 10;
  // 외부에서 위의 데이터 이용 불가.
  // 하지만 함수를 이용해 활용할 순 있도록 한다.

  //   constructor() {
  //     this.name = "홍길동";
  //     this.age = 10;
  //   }

  getName() {
    return this.#name;
  }

  setName(value) {
    this.#name = value;
  }

  getAge() {
    return this.#age;
  }

  setAge(value) {
    this.#age = value;
  }
}
let obj2 = new UserCl();
// obj2.name = "이길동";
// obj2.age = 30;

// 직접 Name, age를 정의하지 못하고, setter/getter함수 이용해야 한다!
obj2.setName("이길동");
obj2.setAge(29);
obj2.getName();
obj2.getAge();
