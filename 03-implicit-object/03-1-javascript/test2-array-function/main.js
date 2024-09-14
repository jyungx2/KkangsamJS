"use strict";

let array1 = [10, 20];
let array2 = [30, 40];

// CONCAT (array + array)
let array3 = array1.concat(array2);
console.log(array3); // [10, 20, 30, 40]

// JOIN (array -> string)
let result1 = array3.join("-");
console.log(result1); // 10-20-30-40

// PUSH & UNSHIFT (데이터를 맨앞 또는 맨뒤에 추가)
array3.push(100); // [10, 20, 30, 40, 100]
array3.unshift(200); // [200, 10, 20, 30, 40, 100]
console.log(array3);

array3.push(1000, 2000);
array3.unshift(3000, 4000);
console.log(array3); // [3000, 4000, 200, 10, 20, 30, 40, 100, 1000, 2000]

// POP & SHIFT (데이터를 맨앞 또는 맨뒤 삭제)
array3.pop();
array3.shift();
console.log(array3); // [4000, 200, 10, 20, 30, 40, 100, 1000]

// SPLICE
// 1. 추가
// 매개변수 : index - 0 (교체할 데이터 개수) - 추가할 데이터
let array = [10, 20, 30, 40];
array.splice(2, 0, "hello"); // hello가 인덱스 2번 자리에 들어감
console.log(array); //  [10, 20, 'hello', 30, 40]

// 여러개 추가..
array.splice(2, 0, "one", "two"); // index: 2자리에 one이 들어감
console.log(array); // [10, 20, 'one', 'two', 'hello', 30, 40]

// 2. 교체 (지정한 개수만큼 삭제한 후, 추가할 데이터로 교체)
// 매개변수 : index - 교체할 데이터 개수 지정! - 추가할 데이터
array.splice(2, 3, "html", "css", "js");
console.log(array); // [10, 20, 'html', 'css', 'js', 30, 40]

// 3. 삭제 (추가 데이터는 없으므로 지정 X)
// 매개변수 : index - 교체할 데이터 개수
array.splice(2, 3);
console.log(array); // [10, 20, 30, 40]

// SLICE
// 1. 매개변수 2개 지정 - 범위 내의 여러 데이터를 배열의 형태로 획득
let result2 = array.slice(1, 4);
console.log(result2); // [20, 30, 40]

// 2. 매개변수 1개(첫번째)만 지정 - 지정한 위치부터 다 획득~!
let result3 = array.slice(2);

//
