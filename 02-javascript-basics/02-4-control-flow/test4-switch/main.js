"use strict";

// Math.random(): 0~1.0 실수로 랜덤값(난수) 발생
// Math.round(): 반올림
const data = Math.round(Math.random() * 10 + 1);
console.log(data);

switch (data % 3) {
  case 0: {
    console.log(`나머지는 0입니다.`);
    break;
  }
  case 1: {
    console.log(`나머지는 1입니다.`);
    break;
  }
  case 2: {
    console.log(`나머지는 2입니다.`);
    break;
  }
  default: {
    console.log(`default 부분이 실행되었습니다.`);
  }
}

// 만약, 난수가 Case 1에 해당할 때, 결코 case 2에 해당되지 않더라도, 한번 케이스에 걸린 순간 그 밑에 하위 결과들을 모두 다 출력해버리기 때문에, break keyword를 사용해야 한다!!
// 특정 결과일 때 특정 컨솔만 출력되게 하기 위해 !
