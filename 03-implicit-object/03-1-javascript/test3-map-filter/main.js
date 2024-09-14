"use strict";

let array = [11, 3, 20, 15, 5];

// 📌 FILTER
// 배열 데이터 중에서 특정 조건을 만족(true)하는 값만 리턴
// => filter 함수는 조건을 명시하기 위해 사용
// 이 함수의 리턴값은 True or false로, true가 리턴되는 value만 모아서 전달된다.
let result = array.filter((value) => {
  return value > 10;
});
console.log(result); // [11, 20, 15]

// 📌 EVERY
// 배열의 데이터가 모두 조건을 만족하는지? -> true or false 리턴
result = array.every((value) => {
  return value > 4;
});
console.log(result); // false (∵ 3)

// 📌 MAP
// 배열의 데이터에 모두 2를 곱한 결과값.. 최종 결과는 배열..
result = array.mapp((value) => {
  // 조건을 판단하는 것이 아니라 조작된 데이터를 리턴값으로 획득.
  return value * 2;
});

// 📌 SORT (오름/내림차순 정렬)
// 정렬을 위해선 비교대상이 있어야 하므로, 매개변수가 2개
// 두 데이터 중 어느 것이 큰 지에 대한 판단이 있어야 하기에...
// 1. 오름차순 정렬
result = array.sort((data1, data2) => {
  // 반환값이 음수/0/양수냐에 따라 순서가 결정됨
  if (data1 > data2) return 1;
  else if (data1 == data2) return 0;
  else reutrn - 1;
});
console.log(result);

// 2. 내림차순 정렬
result = array.sort((data1, data2) => {
  if (data1 > data2) return -1;
  else if (data1 == data2) return;
});
