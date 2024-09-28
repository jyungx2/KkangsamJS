"use strict";

let obj = {
  name: "홍길동",
  age: 10,
  address: "seoul",
};

// 특정 객체의 Property의 descriptor 확인..
console.log(Object.getOwnPropertyDescriptor(obj, "name"));
// {value: '홍길동', writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(obj, "age"));
// {value: 10, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(obj, "address"));
// {value: 'seoul', writable: true, enumerable: true, configurable: true}

// 우리가 지정하지 않아도 하나의 프라퍼티내에 디스크립터라는 객체가 생성되며, 이 객체의 프라퍼티값으로는 value, writable, enumerable, configurable이 있으며 디폴트 값은 모두 true로 지정된다.

// writable... 값 변경 못하게 하
Object.defineProperty(obj, "age", { writable: false });
console.log(Object.getOwnPropertyDescriptor(obj, "age"));
// {value: 10, writable: false, enumerable: true, configurable: true}

// 💥 writable: false 이므로, 해당 프라퍼티 값 수정 불가능!
// obj.age = 20; // 🚨 Cannot assign to read only property 'age' of object '#<Object>'

// Enumerable....
// obj라는 객체의 key 값만 가져오는 함수!! .keys()
console.log(Object.keys(obj)); // ['name', 'age', 'address']
console.log(Object.values(obj)); // ['홍길동', 10, 'seoul']
console.log(Object.entries(obj)); // [Array(2), Array(2), Array(2)]

// in... 열거 예약어..
for (let key in obj) {
  console.log(key);
}
// name age address

for (let [key, value] of Object.entries(obj)) {
  console.log(key, value);
}
// name 홍길동
// age 10
// address seoul

Object.defineProperty(obj, "age", { enumerable: false });
// age 변수는 열거형에 포함시키지 말라는 뜻으로, 컨솔에는 age값을 제외한, 어레이가 2개밖에 나오지 않는다!
console.log(Object.entries(obj)); // (2) [Array(2), Array(2)]
console.log(Object.keys(obj)); //  ['name', 'address']
console.log(Object.values(obj)); // ['홍길동', 'seoul']

for (let property in obj) {
  console.log(property);
}
// name address

console.log(obj); // {name: '홍길동', address: 'seoul', age: 10}
console.log(obj.age); // 10 : 값자체는 존재한다 ^^

// configurable....
// writable을 false로 지정했다고 하더라도.. 누군가가 True로 변경해서 값 변경을 할 수도..
Object.defineProperty(obj, "age", { writable: true });
obj.age = 20; // 🆗 true로 바꾸고 값을 수정하니까 에러 발생 x
console.log(obj);

// descriptor를 조정한 후에 다시 Descriptor가 조정되지 못하게..
Object.defineProperty(obj, "age", { writable: false, configurable: false });
// configurable: false로 지정하면 이제 설정 다시 못바꾸기 때문에 다음과 같이 Writable: true로 지정하려고 하면 에러 발생
// Object.defineProperty(obj, "age", { writable: true }); // 🚨 Cannot redefine property : age at Function.defineProperty

let student = new Object();
// 이건 생성자함수로 객체를 만드는 것이 아닌, 그냥 간단하게 객체를 하나만 지정해주고자 할 때, new Object()로 객체를 선언 가능 => 여기서 prototype은 Object의 prototype이다.
console.log(student);
student.name = "jiyoung";
console.log(student);
