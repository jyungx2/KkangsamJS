let data1 = null;

console.log(data1, `type is ${typeof data1}`);
// null, 'type is object'

let user1 = {
  name: "홍길동",
  age: 25,
  address: "seoul",
};

let user2 = null;
console.log(typeof user1, typeof user2);
// object object;

// undefined... : type 유추가 불가능한 변수일 때,
let data2;
console.log(data2, typeof data2);
// undefined 'undefined'

// error........
// console.log(data3); // ReferenceError: data3 is not defined.
// => null, undefined와 상관없이, 오타때문에 발생하는 단순 에러

// 객체 변수의 멤버에 접근하고 있지만.. 객체 자체가 Null이야..
// user2.name = "김길동"; // TypeError: Cannot set properties of null (setting 'name')

// 변수는 선언되었어... 그런데 타입이 유추가 안돼..
let user4;
user4.name = "김길동"; // TypeError: Cannot set properties of undefined (setting 'name')
