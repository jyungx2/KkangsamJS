"use strict";

// 1) prototype - basic
// 자바스크립트 내 선언한 모든 함수는 기본적으로 prototype 객체를 갖는다.

// 일반 함수의 prototype 객체
function myFun(arg1, arg2) {
  console.log(arg1, arg2);
}
console.log(myFun.prototype); //

// 생성자함수의 prototype 객체
function User(name, age, address) {
  this.name = name;

  User.prototype.age = age;
  User.prototype.address = address;
}

let user1 = new User("홍길동", 20, "seoul");
console.log(user1.name, user1.age, user1.address);
// 홍길동 20 seoul

let user2 = new User("김길동", 30, "pusan");
console.log(user2.name, user2.age, user2.address);
// 김길동 30 pusan

console.log(user1.name, user1.age, user1.address);
// 홍길동 30 pusan

//  객체의 멤버명과 프로토타입의 멤버명이 동일할 수 있고, 동일할 경우, 우선적으로 자기자신 객체의 멤버명을 먼저 찾아 쓴다. (공유사물함 쓰기 싫고 개인사물함 쓰고 싶잖니~)
user1.age = 40; // user1만의 'age' 멤버가 생성되고 밸류가 40으로 설정.
user1.address = "incheon";

console.log(user1.name, user1.age, user1.address);
// 홍길동 40 incheon
// 우선적으로 자기자신(객체) 메모리에서 먼저 찾게 되고, 만약 없다면 프로토타입 멤버를 사용하는 것을 알 수 있음.
console.log(user1.age, user1.__proto__.age); // 40 30
// 여전히 프로토타입에 선언된 30이라는 age 발견 가능. (다만 우선순위에서 밀린 것일뿐.)
console.log(user1.__proto__ == User.prototype); // true
console.dir(user1.__proto__.__proto__); // Object - constructor f Object()로 존재. -> 모든 객체의 가장 최상위 객체..

console.log(user2.name, user2.age, user2.address);
// 김길동 30 pusan
// 얘는 여전히 프로토타입 내 멤버를 사용. 객체에 'age', 'address' 이름의 멤버가 없어서 못찾았으니까!

// 외부에서 프로토타입의 멤버 추가 가능
User.prototype.email = "a@a.com";

console.log(user1.name, user1.age, user1.address, user1.email);
// 홍길동 40 incheon a@a.com

// 2) prototype - this
function Person(name) {
  this.name = name;

  Person.prototype.point = 20;
  Person.prototype.sayHello = function () {
    console.log(`Hello, ${this.name}, ${this.point}`);
  };
}

let person1 = new Person("minji");
person1.sayHello(); // Hello, minji, 20

let person2 = new Person("suna");
person2.sayHello(); // Hello, suna, 20

person1.point = 30;
person1.sayHello(); // Hello, minji, 30

person1.sayHello = function () {
  console.log(`Nihao, ${this.name}, ${this.point}`);
};
person1.sayHello(); // Nihao, minji, 30

let person3 = new Person("hanny");
person3.sayHello(); // Hello, hanny, 20

// 3) prototype - memory
function Dog(name) {
  this.name = name;

  this.sayHello = function () {
    console.log(`Hello, ${this.name}`);
  };

  Dog.prototype.sayBye = function () {
    console.log(`Bye, ${this.name}`);
  };
}

let dog1 = new Dog("coco");
let dog2 = new Dog("kiki");

dog1.sayHello(); // Hello, coco
dog2.sayHello(); // Hello, kiki

console.log(dog1.sayHello() === dog2.sayHello()); // true (undefined)
console.log(dog1.sayHello === dog2.sayHello); // false
// 👉 비록 두 함수의 로직이 동일하더라도, 각각의 함수는 서로 다른 객체에서 선언됐기 때문에 다름 참조를 가진다.

// * 인스턴스: 생성자 함수에 의해 생성된 객체 = dog1, dog2
// Dog 생성자 함수에서 this.sayHello를 정의할 때마다 새로운 함수 객체가 각 인스턴스에 생성되므로, user1.sayHello와 user2.sayHello는 서로 다른 함수 객체를 참조하게 됩니다.
//  같은 로직이지만 메모리에서 다른 함수 객체를 참조하고 있기 때문에, 비교 결과는 false로..
// 이를 해결하고 싶다면, 함수가 프로토타입에 정의되도록 해서 모든 인스턴스가 동일한 함수 참조를 공유하게 만들 수 있습니다:

console.log(dog1.sayBye === dog2.sayBye); // true
// 👉 sayBye()함수는 생성자 함수의 프로토타입(Dog.prototype)에 선언됐기 때문에 모든 객체가 동일한 함수를 참조한다.

// 4) inheritance
function Shape(name) {
  console.log(this); // {} 빈 객체

  this.name = name; // 빈 객체에 name property 심기
}

Shape.prototype.draw = function () {
  console.log(`Let's draw ${this.name} `);
};

Shape.prototype.erase = function () {
  console.log(`Let's erase ${this.name}`);
};

const rect1 = new Shape("rect1");
console.log(rect1); // {name: 'rect1'}

function Rectangle(name, width, height) {
  //  this.name = name;
  // 이 생성자함수 내에서 만들어지는 객체별로 name 데이터가 유지되게 하지 않고, 다른 생성자 함수에서 이미 작성한 name을 그대로 이용하고 싶다면?
  // 자신(this)이 호출되어 객체가 생성될때.. 다른 생성자 함수(상위)도 같이 호출되어자신의 this에 그 생성자 함수에 등록된 멤버가 들어오게..
  // => this keyword를 우리 맘대로, 매뉴얼리하게 설정할 수 있는 call, apply 메서드 이용!
  // 1) Shape이라는 생성자함수 내 정의된 name을 가져올 것이기 때문에 얘 상에서 call method를 부르고,
  // 2) this키워드 자리인 첫번째 매개변수에 Rectangle 함수 내에서의 this = Rectangle 함수에 의해 만들어지는 객체를 뜻하므로 이렇게 쓰면 OK
  // 3) 두번째 키워드는 함수의 매개변수(Parameter)에 해당!!
  Shape.call(this, name);
  // 🌟 이렇게 함수를 불러오면, this로 선언한 name 변수는 자신의 Prototype으로 넘어오지만, Shape.prototype에 선언한 draw, erase 함수까지 넘어오진 않는다!!

  this.width = width;
  this.height = height;
}

const rect2 = new Rectangle("rect2", 100, 200);
console.log(rect2);
// rect2.draw(); // 🚨rect2.draw is not a function (in prototype of CF)

// 📌  상위 객체를 나의 프로토타입으로 지정
Rectangle.prototype = new Shape(); // 새롭게 만든 상위 객체 자체를 나의 Prototype에 연결.. 만들어진 상위 객체는 어쩃든 Shape 함수의 프로토타입과 연결되기 떄문에 프로토타입에 선언한 draw 함수와 Erase 함수에 모두 접근 가능.

// ❗️💥 calcArea함수를 rectangle 프로토타입에 추가할 것!
Rectangle.prototype.calcArea = function () {
  console.log(`area: ${this.width * this.height}`);
};

let rect3 = new Rectangle("rect3", 200, 200);
console.log(rect3.name, rect3.width, rect3.height);
// rect3.draw(); // ✅Let's draw rect3
// rect3.erase(); // ✅Let's erase rect3
// rect3.calcArea(); // ✅area: 40000
console.dir(rect3);
// this : name, width, height
// prototype : calcArea(), ✨name✨(=this로 지정했으므로 바로 사용 가능)
// prototype(Rectangle) - prototype(Shape) : ✨draw, erase,✨ ❓calcArea()
// 반면, draw, erase함수는 Shape prototype에 지정했으므로 바로 사용불가, (🌟Prototype까지 넘어오지 않음!!🌟)
// proto - proto - proto : Object (모든 객체의 최상위 객체)
// Object의 prototype = null... (최상위 객체이므로)
// 👉 rect3.__proto__proto__ (= Shape.prototype)에도 calcArea()가 있는게 살짝 이해가 안된다. => 객체 자체를 연결시켜 줬을 땐 Rectangle.prototype에 함수를 정의하면, 어쩃든 객체 자체의 프로토타입 (=Shape.prototype)과도 연결되므로, R.proto에 정의한 함수가

// 📌 상위 함수의 프로토타입을 나의 프로토타입으로 지정
Rectangle.prototype = Shape.prototype;
// ❗️💥 calcArea함수를 rectangle 프로토타입에 추가할 것!
Rectangle.prototype.calcArea = function () {
  console.log(`area: ${this.width * this.height}`);
};

let rect4 = new Rectangle("rect4", 200, 400);
console.log(rect4.name, rect4.width, rect4.height);
rect4.draw();
rect4.erase();
rect4.calcArea(); // 🚨 Shape.prototype으로 교체한 뒤, Rectangle.prototype상에 calcArea() 함수를 또 선언해줘야 한다. 저 위에서 선언해줬다 해도, Shape.prototype으로 바뀐 다음에, 선언해줘야 calcArea()를 쓸 수 있는 것!

console.dir(rect4);
// this : name, width, height
// prototype : ✨draw, erase✨, calcArea()
// 👉 prototype자체를 교체했으므로, rect4의 프로토타입 자체(=Rectangle.prototype)가 Shape.prototype이므로, Shape.prototype에서 정의한 모든 함수(draw, erase)들이 이곳으로 몽땅 모이는 것! + 내가 나중에 Rectangle.prototype상에서 선언한 calcArea까지 보임.
