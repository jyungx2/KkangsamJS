"use strict";

// 모든 도형에 공통으로 개발하는 개발자 입장에서
// 다른 개발자들이 만드는 모든 도형에 공통으로 들어가는 멤버..
function Shape(name) {
  console.log(this);
  //1. 생성자 함수, new Shape()으로 객체를 생성하게 되면 자동으로 객체가 하나 만들어진다.
  //2. 생성자 함수를 거치면서 그 객체에 변수, 함수가 등록된다.
  //3. this: 객체 생성 시점에 자동으로 만들어지는 객체를 지칭한다.
  // (현재 그 부분을 실행시키고 있는 객체)
  this.name = name;
}

Shape.prototype.draw = function () {
  console.log(`${this.name} 도형을 그립니다.`);
};

const rect1 = new Shape("rect");

console.log(rect1.__proto__ === Shape.prototype); // true
console.log(Shape.prototype.isPrototypeOf(rect1)); // false
console.log(Shape.prototype.isPrototypeOf(Shape)); // true

// 후배 개발자 입장에서 선임 개발자가 만들어놓은 Shape를 상속받아서 자신이 구체적으로
// 만들어야 하는 도형을 개발하겠다는 입장...
function Rectangle(name, width, height) {
  // name 데이터가 객체에 유지되어야 한다..
  // 아래처럼 작성해서 객체별로 데이터가 유지되게 할수도 있지만..
  // this.name = name
  // 다른 생성자 함수에 name을 작성, 그걸 그대로 이용..
  // 자신이 호출되어 객체가 생성될때.. 다른 생성자 함수(상위)도 같이 호출되어
  // 자신의 this에 그 생성자 함수에 등록된 멤버가 들어오게..
  Shape.apply(this, [name]);
  // >> Shape객체(+프로토타입) 내 정의된 함수를 내가 현재 부르고 있는 객체 상에서 호출하는 것일 뿐,
  // 밑에서 상위 객체를 교체하거나, 상위 프로토타입만을 교체하거나 하는 코드를 써야한다.

  // 🌟 이쯤에서 다시 정리하는 apply method 신택스 🌟
  // '생성자 함수' 는 함수이고, 함수는 객체이므로, 함수또한 메소드를 가지는데,
  // 함수 메소드로는 대표적으로 3개가 있다. call/apply/bind
  // 위 코드는 아래 코드와 동일!
  // Shape.call(this, [...name]);
  // call/apply/bind 메소드: 함수가 가지는 This keyword가 어떤 오브젝트를 가리킬지를 아주 명쾌하고, 매뉴얼리하게 설정할 수 있다.

  // ❓ 객체 여러개에 공통값인가? 객체별로 다르게 유지되어야 하는 값인가?
  // >> 객체 여러개에 공통 값인가? ==> prototype에 등록
  // >> 객체 별로 다르게 유지되어야 하는 값인가? ==> this에 등록..

  // 🖍️ width, height 데이터가 객체에 유지되어야 한다.
  this.width = width;
  this.height = height;
}

let rect2 = new Rectangle("rect2", 100, 200);
// name을 Rectangle에서 직접 준비하지 않았다.
// Shape 생성자 함수를 같이 실행시킨 것.. Shape에 등록한 것이 Rectangle에서 마치 자신의 것인 것 마냥 사용하고 있다 => 상속 개념..
console.log(rect2.name, rect2.width, rect2.height); // react1 100 200

// 📌 상위 프로토타입(Shape)과 자신의 프로토타입을 교체하여 공유하지 않았을 때
// 🌟 객체 생성 시점에 상위 생성자함수를 호출하였지만, 상위의 Prototype까지 상속되진 않는다.
// rect2.draw(); // 에러 발생🚨

// 📌 상위 프로토타입(Shape)과 자신의 프로토타입을 교체하여 공유했을 때.
// 어떤 생성자 함수를 상속하고자 할 때.. 그 함수의 prototype까지 상속되게 하고자 한다면?
Rectangle.prototype = new Shape(); // 상위 객체 자체를 나의 Prototype에 연결해  프로토타입 교체!

// 또한 나만의 프로토타입에 calcArea라는 함수를 정의해서 나만 쓸 것이다!!
Rectangle.prototype.calcArea = function () {
  console.log(`area: ${this.width * this.height}`);
};

let rect3 = new Rectangle("rect3", 200, 200);
console.log(rect3.name, rect3.width, rect3.height);
rect3.draw(); // Shape(상위) 함수의 프로토타입에 설정된 함수여서 Rectangle 자신의 프로토타입과 공유하는 코드를 작성하고나서야 에러뜨지 않고 불러올 수 있음.
rect3.calcArea(); // Rectangle(하위) 함수의 프로토타입에 설정된 함수이므로 당연히 사용가능.

console.dir(rect3);
// this - name, width, height
// prototype - 🌟name🌟, calcArea (Rectangle의 프로토타입에 정의)
// prototype(of R) - prototype(Shape) - draw, erase(Shape의 프로토타입에 정의)

// 상위 프로토타입을 상속받고자 할때
// 📌 위처럼 상위 객체를 나의 프로토타입으로 등록해도 되고..
// ex) Rectangle.prototype = new Shape()

// 📌 상위의 프로토타입을 나의 프로토타입으로 지정해도 된다..
Rectangle.prototype = Shape.prototype;
Rectangle.prototype.calcArea = function () {
  console.log(`area: ${this.width * this.height}`);
};

let rect4 = new Rectangle("rect3", 100, 200);
rect4.draw();
rect4.calcArea();
console.dir(rect4);
//this = name, width, height
//prototype - draw, calcArea
