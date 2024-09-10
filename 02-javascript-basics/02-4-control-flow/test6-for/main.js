"use strict";

for (let i = 0; i < 3; i++) {
  console.log(`Hello ${i}`);
}

for (let i = 3; i > 0; i--) {
  console.log(`World ${i}`);
}

for (let data1 = 1, data2 = 10; data1 <= 5 && data2 > 5; data1++, data2 -= 2) {
  console.log(`data1 : ${data1}, data2 : ${data2}`);
}
// data1 : 1, data2 : 10
// data1 : 2, data2 : 8
// data1 : 3, data2 : 6

// 배열의 데이터..를 순차적으로 획득해서 핸들링
let array = [10, 20, 30];
// 배열 데이터는 단일?..머시기라서 밸류로 구분할 수없고, 인덱스로 구분하여 명시
for (let i = 0; i < array.length; i++) {
  console.log(`array[${i}] = ${array[i]}`);
}
// array[0] = 10
// array[1] = 20
// array[2] = 30
// array[3] = undefined

// 1부터 10까지 더해서 최종 결과를 출력
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log(sum); // 5050

// 1부터 10까지 더해서 최종 결과 출력, 홀수만 더해서...
let sum2 = 0;
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    sum2 += i;
  }
}
console.log(sum2); // 25

// 구구단 찍기.. 2단...
for (let i = 1; i < 10; i++) {
  console.log(2 * i);
}
