"use strict";

let name = "홍길동";
const calSum = (no) => {
  let sum = 0;
  for (i = 1; i <= no; i++) {
    sum += i;
  }
  return sum;
};

// 📍 문자열 데이터, 여러라인...
// let a = "hello world";

// 📍 js code적으로는 개행에 의한 데이터(\n)이 유지되지만,
// html에서는 모든 화면이 태그로 인식되기 때문에, 이렇게
// document.write()함수로 Html로 출력할 때, 줄바꿈하고 싶으면 <br/> 써라.
// let a = `hello <br/> world`;
// document.write(a);

// 📍 deprecated: 권장사항이 아니다. => 쓰지 않는게 좋다.
// name: 윈도우에서 선언된 name이라는 변수가
// 디폴트로 존재하여(alert(),prompt() 등..) deprecated라고 뜸.
document.write(
  `안녕하세요 ${name}님, 함수 호출 결과는 ${calSum(10)}, ${10 + 20}`
);

// 📍 template string의 ${}에는 expression code만 가능하다.
// 아래처럼 statement 코드는 불가능하다.
// let a = `${let data = 10}`

// 📍 undefined vs null
// 🌱 undefined: 자바스크립트에만 있는 개념으로, 변수 안에 데이터를 입력하지 않은 상태를 의미합니다.
// => 데이터 타입 자체로, 예를 들어, let d; 라고 d라는 변수를 정의했을 때, 값이 할당이 안
// 되어 있으므로 이 데이터의 타입은 Undefined이다. let user = null; user 변수의
// 데이터 타입은 오브젝트로, 오브젝트 데이터가 없다는 값인 null을 가진다.

// 🌱 null: 개발자가 임의로 변수 안에 빈 데이터를 삽입한 상태를 의미합니다.
// => null의 데이터 타입은 객체로, '값이 없다'를 표현하는 ✨값✨
// = 객체(data type)를 선언하긴 했는데 아직 값을 가지진 않았어라고 표현하고 싶을 때 사용하는 값.
// * 객체: 관련있는 변수, 함수를 묶어놓은 단위
// 객체가 Null인 것이 오류가 아니라, null인 객체의 변수 혹은 함수를 이용하려고 하는 순간 에러가 발생
