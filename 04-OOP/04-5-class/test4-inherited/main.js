"use strict";

// Test 1
class Shape {
  name = "도형";
  x = 0;
  y = 0;
  draw() {
    console.log(`${this.name}을 ${this.x}, ${this.y}에 그립니다.`);
  }
}

class Rect extends Shape {
  width = 0;
  height = 0;
}

// 부모 클래스(super)에 정의해준 멤버들을 마치 내 클래스에 정의한(subclass) 멤버인 것처럼
// 마구 수정하고, 갖다 쓸 수 있다! => 클래스 사이에서의 상속이 주는 가장 큰 이점..
let rect = new Rect();
rect.name = "사각형";
rect.x = 10;
rect.y = 10;
rect.width = 100;
rect.height = 100;
rect.draw();

// Test 2
class Super {
  data1 = 10;
  #data2 = 20;
  static data3 = 30;
}

class Sub extends Super {
  static data4 = 40;
  subFun() {
    // 부모에 선언된 것을 마치 자신의 것처럼 사용 가능
    console.log(this.data1);
    // console.log(this.#data2); // 🚨 private은 자신의 클래스 내에서만 사용하겠다는 선언.
    // 상속되지 않고, 하위 클래스에서 사용할 수 없다.
  }
}

let obj = new Sub();
obj.subFun(); // 🚨 #data2

console.log(Super.data3); // 30 : 당연히 자기 클래스 내 정의된 멤버이므로 가능
console.log(Sub.data4); // 40 : 마찬가지로 당연히 가능
console.log(Sub.data3); // 30 : 아무 에러 없이 30 출력 => 상위 static멤버를 하위 클래스명으로 잉요가능... 상속됨!!
console.log(Super.data4); // undefined

// 정리
// super class를 subclass로 Extend를 이용해 연결할 때,
// private member는 상속되지 않아 subclass에서 사용시 에러가 발생하고,(당연히 해당 클래스 내에서만 접근/사용가능하므로..) static method는 일반 객체 멤버처럼 상속되어 아무 에러없이 사용가능.

// 1️⃣ 생성자를 개발자가 명시적으로 선언하지 않은 경우.. 에러 발생 ❌
// 자동으로 constructor(){super()}라는 코드가 subclass(Sub1) 안에 자동으로 추가되기 때문..
// class Super1 {}

// class Sub1 extends Super1 {}

// let obj1 = new Sub1();

// 2️⃣ 개발자가 명시적으로 생성자를 추가한 경우... 에러 발생 🚨
class Super1 {
  constructor() {}
}

class Sub1 extends Super1 {
  // 아래처럼 생성자를 명시적으로 선언하면 에러 발생.
  /*
  constructor() {
    super(); // 상위 생성자 호출구문, 생성자 내에서만 작성 가능
    // 생성자 바깥에 정의된 public method 내에 작성하면 안됨! (딱 한 번만 constructor내에서 정의 가능.)
  }
  */
  // 아래처럼 개발자가 명시적으로 생성자를 추가했고, 상위 클래스가 명시되어 있다면(extends)
  // 생성자 내에서 꼭 상위 생성자 호출해야 한다..

  constructor() {
    super();
    this.data = 10; // This에 접근하기 전에 항상 super()를 먼저 선언해야함!
    // super(); // super함수(=부모클래스의 생성자함수)를 먼저 선언해줘야 this가 정의되기 때문에🚨

    // 새로운 프라퍼티(멤버)를 추가해서 정의하고 싶을 때만, constructor 함수 내부에 subclass(자식class)에 this keyword를 만드는 역할을 하는 super 함수(= 부모 클래스의 생성자함수)를 불러오고, 새로운 멤버를 등록해주는 것이다.
  }
}

let obj1 = new Sub1();

//test3..... 상위 생성자 호출..
class Super2 {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
}
class Sub2 extends Super2 {
  constructor(name, x, y, width, height) {
    super(name, x, y); //상위 생성자 호출하면서 매개변수 전달...
    this.width = width;
    this.height = height;
  }
}
let obj2 = new Sub2("rect2", 20, 20, 200, 200);

//test4..... override...........
//상위에 선언된 멤버를 동일 이름으로 하위 클래스에서 재정의
//상위 멤버 상속은 안된다..
//변수 오러라이드 - 하위에서 데이터 초기화 다시..
//함수 오러라이드 - 알고리즘 교체..
//이름을 다르게 해서 멤버를 선언하면 동일 행동, 데이터를 가지는 멤버가 두개..
class Shape2 {
  data = 10;
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
  calcArea() {
    console.log(`${this.name}의 면적을 계산합니다.`);
  }
}
class Rect2 extends Shape2 {
  //변수 오버라이드
  data = 20;
  constructor(name, x, y, width, height) {
    super(name, x, y);
    this.width = width;
    this.height = height;
  }
  //함수 오버라이드
  calcArea() {
    //상위 멤버 상속이 안된다.. 명시적으로 상위 함수를 호출하겠다면..
    super.calcArea();
    console.log(`넓이는 ${this.width * this.height}`);
  }
}
let rect3 = new Rect2("사각형", 10, 10, 20, 20);
console.log(rect3.data); //20
rect3.calcArea(); //사각형의 면적을 계산합니다.
//넓이는 400
