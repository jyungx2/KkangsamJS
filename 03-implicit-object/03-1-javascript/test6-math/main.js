"use strict";

// round ... 반올림
// new 연산자 이용해서 객체 생성 X -> 그냥 매개변수 자리에 입력해 값 출력..
console.log(Math.round(0.56)); // 1
console.log(Math.round(1.1)); // 1
console.log(Math.round(-1.1)); // -1
console.log(Math.round(-0.56)); // -1

console.log(Math.ceil(0.56)); // 1
console.log(Math.floor(0.56)); // 0

// random, 0~1 사이의 실수..
console.log(Math.random()); // 0.7311908...
console.log(Math.floor(Math.random() * 100 + 1));

// 51~70 사이의 난수..
let max = 70;
let min = 51;
console.log(Math.random() * (max - min) + min);

// Min, max....
let array = [39, 45, 21, 60];

// ...
// 1: rest parameter(pattern) - 함수의 마지막 매개변수를 Rest parameter로 선언
// 2: spread operator - 배열의 데이터를 전체 나열할 때 ...
// ...array => 39, 45, 21, 60
console.log(Math.min(...array)); // 21
console.log(Math.max(...array)); // 60
