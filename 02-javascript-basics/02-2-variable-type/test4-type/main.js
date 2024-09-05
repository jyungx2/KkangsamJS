"use strict";

let data = 10;
console.log(data, "type is", typeof data);
// 10(num) 'type is' 'number'

data = "홍길동";
console.log(data, "type is", typeof data);
// 홍길동 type is string

data = true;
console.log(data, "type is", typeof data);
// true 'type is' 'boolean'

data = "10";
console.log(data, "type is", typeof data);
// 10(str) type is string

let data1 = 10;
let data2 = 20;
let data3 = "10";
let data4 = "20";

console.log(data1 + data2);
// 30
console.log(data3 + data4);
// 1020
console.log(data1 + data3);
// 1010

// 📍 Template String(literal)
// '정적데이터' + 동적데이터(변수) + '정적데이터'... 의 조합의 문자열을 출력할 일 엄청 많을 것.
// '+'로 연결, 정적 데이터를 ''로 감싸는 것 등, 너무나도 복잡하고 귀찮은 작업🤯
// => ⭐️template string(literal)의 개념 사용!⭐️
// 문자열 내에 동적 데이터가 들어간다고 하면, 전체 문자열 하나를 ``(backtick)으로 묶고,
// 동적 데이터를 ${}으로 묶어주어 하나로 처리한다.
