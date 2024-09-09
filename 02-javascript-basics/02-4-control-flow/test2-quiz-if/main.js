"use strict";

const answer = prompt("나이를 입력하세요.");
const num = Number(answer);
console.log(answer);
console.log(num);

// null이나, ""은 Number()에 의해 0으로 바뀌기 때문에, 취소버튼을 눌렀을 때 의도한 대로 첫번째 코드가 나오지 않고, '어린이군요'가 나온다.
// 그럼 만약, answer을 미리 Number로 바꿔놓고 하고 입력취소컨솔을 출력하고 싶다면??
//  === 0이라고 조건을 바꾸면 나중에 만약에 나이가 0이었을 때 특정 컨솔값을 출력할 수가 없잖아 ㅠㅠ
if (answer === null || answer === "") {
  console.log(`입력을 취소 하였습니다.`);
} else if (isNaN(answer)) {
  console.log(`숫자가 아닌 문자를 입력 하셨습니다.`);
} else {
  if (num < 0 || num >= 100) {
    console.log(`1 이상, 100 이하의 숫자를 입력해야 합니다.`);
  } else if (num === 0) {
    console.log(`애기군요!`);
  } else if (num < 10) {
    console.log(`어린이군요`);
  } else if (num >= 10 && num < 20) {
    console.log(`청소년이군요`);
  } else if (num >= 20) {
    console.log(`어른이군요`);
  }
}
// 3항 연산자는 연산자입니다. if-else 조건절을 연산자라고 하진 않습니다.
// 연산자라 함은 무언가 연산이 실행되고 그 연산에 의한 결과가 나오게 되는 것.

console.log(typeof NaN); // number
