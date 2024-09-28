"use strict";

// test1) 함수와 프로토타입
function myFun(arg1, arg2) {
  console.log(arg1, arg2);
}

// 일반함수로 준비..
// 에러 발생하지 않았다.. myFun 내에 Prototype 변수를 선언한 적이 없는데...

// => 생성자 함수가 아니더라도, prototype 객체는 모든 함수 내에 준비되기 때문에
// 만들어진 Prototype 내에는 자동으로 constructor() 함수를 가지고 나머지 멤버는 없는 빈 상태의 객체가 자동 준비..
console.log(myFun.prototype);

// test2) 생성자 함수..와 프로토타입..
function User(name, age, address) {
  // this.xxx -> 객체가 생성될 때마다.. 객체의 메모리에 유지
  this.name = name;

  // 프로토타입에 멤버 선언 -> 객체가 몇개 생성되든 상관없이 한 곳에만 유지.. 객체 간 공유 가능.
  User.prototype.age = age;
  User.prototype.address = address;
}
let user1 = new User("홍길동", 20, "seoul");
console.log(user1.name, user1.age, user1.address);
// 홍길동 20 seoul
// 🔅name: This(해당 생성 객체)에 접근하여 선언 -> 객체의 메모리에 유지
// 🔅age: 생성자함수의 prototype 객체에 선언 -> 객체 자체의 메모리에 X
// 🔅address: age와 마찬가지지만, 이 둘이 모두 정상적으로 출력되는 이유는!?
// 모든 객체는 객체를 생성한 함수의 프로토타입 자체에 접근할 수 있으므로 오류없이
// 프로토타입 내부에 선언된 멤버에 접근가능 ✅

let user2 = new User("김길동", 30, "pusan");
console.log(user2.name, user2.age, user2.address);
// 김길동 30 pusan
console.log(user1.name, user1.age, user1.address);
// 홍길동 ❗️30❗️❗️pusan❗️

// 👉 age와 address 프라퍼티(변수)는 생성자함수에 의해 생성된 모든 객체가 공유할 수 있는 프로토타입 객체 내부에 정의했으므로, user2 객체에 의해 30, pusan이라는 값으로 새로 덮어쓰기 됐으므로(기존값; 20, seoul) 이제는 더이상 20, seoul이 아닌, 새로 정의해준 30, pusan이라는 값으로 바뀌게 되는 것!

// 이렇게, 객체 간에 따로따로 독립적으로 유지해야 하는 individual한 데이터와 공통으로 공유할 수 있는 데이터를 담아 사용할 수 있다.

// dir: 객체를 자세하게 뜯어보자!
console.dir(user1);
console.dir(user2);
console.log(User.prototype.constructor);

// test3) prototype의 변수를 객체로 값을 대입해서 바꾸면..
user1.age = 40;
user1.address = "incheon";
// 💥Prototype의 데이터가 변경되지 않고, 그 객체 내에 동일이름의 변수가 선언되어 그 객체 내에 유지되는 데이터가 된다..

// 👉 따라서 User1 객체의 메모리 상에 age, address라는 데이터가 최초로 생성되고, 이 값들을 각각 40, Incheon으로 설정해준 것일뿐. Prototype 객체 내에 있는 age, address값은 여전히 30,pusan으로 유지되어 user2에서의 age, address값은 그대로 30 pusan으로 출력됨.
console.log(user1.name, user1.age, user1.address);
// 홍길동 40 incheon
// 👉 이를 통해 객체의 멤버명과 프로토타입의 멤버명이 동일할 수 있지만, 우선적으로 자기자신(객체) 메모리에서 먼저 찾게 되고, 만약 없다면 프로토타입 멤버를 사용하는 것을 알 수 있다. 이러한 원리로, user1의 경우, 40 Inchen이 출력된 것을 볼 수 있음.

console.log(user2.name, user2.age, user2.address);
// 💥김길동 30 pusan

console.dir(user1); // name밖에 없었는데, age, address값이 추가되고,
// Prototype 객체 내에는 여전히 30, pusan 값이 유지된다.
console.dir(user2); // 여전히 name밖에 존재 X , Prototype에만 age, address 찾을 수 있어 이 값으로 출력됨(따로 개인적인 데이터 가질 필요 없어~! 난 그냥 공유해서 공용 데이터 쓸게~!)

// test4) 생성자함수 내에서만 Prototype멤버가 추가되는 것이 아니라 외부에서 추가 가능.
User.prototype.email = "a@a.com"; // 객체 간의 공유 데이터
console.log(user1.name, user1.age, user1.address, user1.email);
// 홍길동 40 incheon a@a.com

// 객체의 멤버명과 프로토타입의 멤버명이 동일할 수 있다.
// 우선으로 객체 멤버가 이용.
// 명시적으로 이름이 동일할 때, 프로토타입의 멤버를 참조하고 싶다면..
console.log(user1.age, user1.__proto__.age); // 40 30
// 40: user1만을 위한 객체 데이터
// 30: 모든 객체가 공유가능한 공용 데이터 -> 프로토타입의 멤버 참조 가능🆗

// 프로토타입과 객체(this)에 동일한 이름의 멤버 선언이 가능하고, 이를 이용해  ✨객체들끼리 공유해야하는 멤버를 프로토타입으로 선언✨한 후에 어떤 특정 객체에서 프로토타입에 선언한 멤버를 다시 ✨자신의 this에 선언✨해서 특정 객체만 다른 값 혹은 로직(메서드)을 가지도록 할 수 있다.
