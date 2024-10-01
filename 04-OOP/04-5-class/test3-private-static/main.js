"use strict";

// test 1) .....private
// JS에는 private이라는 예약어가 없다. oop에서 private이라는 개념은
// 클래스 내에 선언된 멤버가 그 클래스내에서만 사용되게 강제하는 기법을 의미한다..

// 🌱 class내에 필요는 하니까 선언은 하지만, 유지보수성 및 결합도?를 위해 외부에서 접근할 수 없게끔 강제시킬 필요성 있다.

class User {
  // 클래스 내에 선언된 변수, 함수 중에서 일부는 클래스내에 필요하니까
  // 선언은 하지만, 외부와 결합도를 낮추어서 유지보수성을 증대시키기 위해
  // 외부에서 이용하지 못하게 하고 싶다.
  // 매뉴얼에 아무리 써봐야 외부 개발자가 그걸 안보거나 무시할 수 있기 때문에
  // 아예 강제시키고 싶다!! -> Private하게 만들고 싶다. -> 자바스크립트에서는 private 역할을 하는 예약어가 없다.(개발자들이 아쉬워함) -> 대신, private 개념으로 사용하고자 하는 멤버의 이름 앞에 #을 붙여준다. => 이렇게 멤버 앞에 #이 붙은 것을 "Private field"(=property)라고 부른다.
  name; // Public fields
  #age; // Private fields(=property, field : 객체소속변수)

  // *variable = property = field (프라퍼티와 필드는 객체소속변수)

  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

  #myFun() {
    console.log(`myFun calling..`);
  }

  sayHello() {
    console.log(`Hello, ${this.name}, ${this.#age}`);
  }
}

let user = new User("홍길동", 20);
console.log(user);

user.name = "김길동";
// user.#age = 30;
// 🚨 Private field '#age' must be declared in an enclosing class
console.log(user.age);

user.sayHello();
// user.#myFun();
// 🚨 Private field '#myFun' must be declared in an enclosing class

console.log(user);

// // test 2) .....static
// 클래스는 객체의 모형이다.. 클래스의 대부분의 멤버는 객체 메모리에 할당되어야 하는 객체 멤버지만, 필요에 의해서 선별적으로 객체별 메모리 할당이 필요없는 멤버에 한해서.. static 예약어를 이용해서 만든다.

class MyClass {
  data1 = 10;
  static data2 = 20;

  myFun1() {
    console.log(`myFun1 call... ${this.data1} ${this.data2}`);
  }

  static myFun2() {
    console.log(`myFun2 call... ${this.data1} ${this.data2}`);
  }
}
// static 멤버 접근.. (객체 생성없이, 클래스명으로 접근.)
MyClass.myFun2();
// static멤버는 객체가 아닌, class 메모리에 저장되기 때문에 단순 객체 멤버인 data1은 찾을 수 없어 Undefined로 뜬다.
// 객체를 생성했따 하더라도, class 내 메모리에는 저장이 안되기 때문에,
// 여전히 Undefined로 뜬다. => static 남발하지 마라!~!
console.log(MyClass.data2); // 20

console.log(MyClass.data1); // undefined
// 단순 객체 멤버는 클래스명으로 접근 불가!!
// 객체멤버는 무조건 객체를 생성하여 접근할 수 있다.

// MyClass.myFun1(); //🚨 MyClass.myFun1 is not a function

// 객체 멤버는 객체명으로 접근해야 한다.
let obj = new MyClass();
console.log(obj.data1); // 10
obj.myFun1(); // myFun1 call... 10 undefined

// static 멤버는 객체명을 접근하지 못하고, class명으로 접근해야 한다!
console.log(obj.data2); // undefined
// obj.myFun2(); // 🚨obj.myFun2 is not a function

// 정리
// ✅ static 멤버는 객체 메모리에 할당할 필요가 없다고 판단되어 클래스명으로만 접근가능하게..
// ✅ object 멤버는 객체 생성 후 객체 메모리에 데이터가 할당되어 객체명으로만 접근 가능하다..
