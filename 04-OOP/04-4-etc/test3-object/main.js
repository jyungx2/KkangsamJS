"use strict";

// 간단하게 객체를 생성해서 사용하는 방법 - Object literal..
let user1 = {
  name: "홍길동",
  age: 20,
};

console.log(user1);
// {name: '홍길동', age: 20}
// prototype: Object

console.dir(user1);
// this - name, age
// prototype: Object
// => 모든 객체는 Prototype이 지정된다..
// 함수가 프로토타입을 자동으로 갖는다는 건 알고있었찌만,
// 지금은 생성자함수 없이 그냥 오브젝트 리터럴로 간단하게 만든 것임에도 불구하고, Object라는 프로토타입이 만들어진다..
//왜? : object literal기법으로 만든 객체는 아래처럼 만든 것과 동일하기 때문. & 프로토타입이 없는 객체는 존재할 수 없다.
let user2 = Object.create(Shape.prototype, {
  name: { value: "이길동" },
  age: { value: 20 },
});
console.log(user2);
// {name: '이길동', age: 20}
console.dir(user2);
// this - name, age
// prototype: Object

// 그럼 귀찮게 왜 2번방법으로 만들냐? 1번으로 하지
// => 2번 방법은 특정 내가 원하는 객체의 프로토타입을 직접 지정할 수 있다는 장점이 있기 때문!
// 즉, 생성자함수를 이용해 객체를 만들면 그 함수의 Prototype이 자동으로 만들어지는데(원한다면 그 프롱토타입에 멤버를 추가가능), 그런데 object literal 기법으로 만들면 생성자함수가 없는데, prototype 지정을 어떻게 하냐? => 이때, object.create()로 객체를 생성하면서 원하는 프로토타입을 지정해서 사용할 수 있도록 한 것.
// 💥이때 물론 Object.prototype은 굳이 Object.create()로 지정해주지 않아도, 최상위 객체로서 항상 존재하게 되고, 그 밑에 연결할 Prototype을 설정해주는 것.

function Shape(name) {
  this.name = name;
}
Shape.prototype.draw = function () {
  console.log(`${this.name}을 그립니다.`);
};
let rect1 = Object.create(Shape.prototype, {
  name: { value: "rect1" },
  width: { value: 100 },
  height: { value: 200 },
});
rect1.draw(); // rect1을 그립니다.
console.dir(rect1);
// this - name, width, height
// prototype(.__proto__) - Shape.prototype
// prototype(.__proto__.__proto__) - Object.prototype
