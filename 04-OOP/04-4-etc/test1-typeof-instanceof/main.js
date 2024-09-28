"use strict";

function User() {}

let user1 = new User();

// typeof.....
console.log(typeof 10); // number
console.log(typeof [10, 20]); // object
console.log(typeof User); // function
console.log(typeof user1); // object
console.log(typeof true); // boolean
console.log(typeof "happy"); // string

// instanceof......
console.log(10 instanceof Number); // false
console.log(new Number(10) instanceof Number); // true

function Car() {}
console.log(user1 instanceof User); // true // user1 객체의 프로토타입(=user.__proto__ == User.prototype)
console.log(user1 instanceof Car); // false // user1 객체의 프로토타입 (=user.__proto__ !== Car.prototype)

function Shape() {}
function Rectangle() {}

Rectangle.prototype = Shape.prototype; // 🌟

let shape = new Shape();
let rect = new Rectangle();

console.log(shape instanceof Shape); // true
console.log(shape instanceof Rectangle); // true => 🌟코드때문

console.log(rect instanceof Shape); // true
console.log(rect instanceof Rectangle); // true => 🌟코드때문

Rectangle.prototype = new Shape(); // 아예 새로운 객체를 만들어서 연결시키는 것이므로, Shape의 prototype은 Rectangle.prototype은 다르다.
// 이 코드는 위에서 true로 나왔던 🌟 결과가 true가 아닌, false로 나온다.
// instanceof은 왼쪽 객체의 prototype을 보고, 오른쪽 생성자 함수의 prototype이냐를 따져서 true/false냐를 판단하기 때문!
