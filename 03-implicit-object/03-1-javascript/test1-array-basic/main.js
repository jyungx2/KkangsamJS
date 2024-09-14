"use strict";

// 📌 배열 선언....

// 1) [] 기법 이용
let product1 = ["book1", "book2"];
let product2 = [];

// instanceof - 연산자.. true / false 리턴
// => 왼쪽 객체가 오른쪽 타입인가?
console.log(product1 instanceof Array); // true
console.log(product2 instanceof Array); // true

// 2) new 연산자 이용
let product3 = new Array("book3", "book4");
let product4 = new Array(); // 빈 배열 객체..

console.log(product3 instanceof Array); // true
console.log(product4 instanceof Array); // true

// 3) array 객체 내장돼 있는 length 프라퍼티 이용
// .: 객체 멤버 접근 연산자
console.log(product1.length);

// 배열 객체가 가지고 있는 모든 데이터를 순차적으로 획득해서 로직을 돌리기

// 1) for loop...
for (let i = 0; i < product1.length; i++) {
  console.log(`product1[${i}] = ${product1[i]}`);
}

// 2) 배열 객체 상에선 forEach()함수가 가장 많이 쓰임!
// ==> 배열의 각 요소를 순차적으로 처리하는데 매우 유용한 배열 method.
// ==> 배열의 데이터 개수만큼 (콜백)함수를 반복 실행하는 (고차)함수.
// forEach() 함수는 배열의 각 요소에 대해 콜백함수를 호출하는 higher order function으로서,
// 매개변수에 전달된 개발자 함수는 callback function으로서 배열의 각 요소에 대해 호출됨.
// 매개변수에 전달한 개발자 함수를 배열의 갯수만큼 순차적으로 호출하여 함수 실행
product1.forEach((value, index) => {
  console.log(`array[${index}] = ${value}`);
});

// 배열 데이터 수정
product1[0] = 10;
product1[1] = 20;
console.log(product1);

// 배열 데이터 추가
product1.push(30);
product1.push(40);
console.log(product1);
