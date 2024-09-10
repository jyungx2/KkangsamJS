"use strict";
// 📍 break, continue
/* for문 혹은 While, do-while 문을 이용해서 반복문을 작성하다 보면
break 혹은 continue를 이용하는 경우가 있다.
break와 continue는 반복문 내에 작성되어 "반복문의 실행 흐름을 제어"하기 위해서 사용된다. 물론 break는 switch-case문에서도 사용되며 break을 사용하면 switch를 벗어나게 되어 제어하는 역할로 사용된다. (continue는 switch-case문에서 쓰이지 X)

body 내에서 반복을 끝내야 하는 경우 break를, 반복 조건을 다시 판단해야 하는 경우엔 continue를 쓴다.
즉, break문은 break을 만나게 되면 반복문을 끝내게 되고, continue를 만나게 되면 아랫 부분이 실행되지 않고 그 자리에서 다시 반복조건을 판단하여 루프가 실행된다.
*/

// 특정 위치의 반복문이 제어되게 하고 싶다면 라벨을 이용해야 한다.
// 라벨: 개발자가 지정하는 임의 식별자이며, 반복문에 식별자를 선언하고, Break에서 그 라벨을 명시하여 해당 반복문이 제어되게 할 수 있다.
myloop: for (let i = 0; i < 2; i++) {
  console.log(`position 1: ${i}`);
  for (let j = 0; j < 2; j++) {
    console.log(`position 2: ${i}, ${j}`);
    break myloop;
  }
}

for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue; // 짝수는 건너뛰고 홀수만 출력되게끔!
  }
  console.log(`for body ${i}`);

  if (i === 7) {
    break; // 8은 찍히지 않게 된다.
  }
}

// 📌 이중 루프문에 break를 썼을 때 둘 중 어떤 루프문이 break될까?
// => 자신을 감싸는 가장 가까운 루프문을 끝낸다!
for (let no1 = 0; no1 < 2; no1++) {
  console.log(`step1 : ${no1}`);

  for (let no2 = 0; no2 < 2; no2++) {
    console.log(`step2 : ${no1}, ${no2}`);
  }
}

// 🧩 결과
// step1: 0
// step2: 0, 0;
// step2: 0, 1;
// -----------
// step1: 1;
// step2: 1, 0;
// step2: 1, 1;

// 📌 Inner loop에 break 사용할 때는,
// => 그냥 inner loop안에 break 선언!
for (let no1 = 0; no1 < 2; no1++) {
  console.log(`step1 : ${no1}`);

  for (let no2 = 0; no2 < 2; no2++) {
    console.log(`step2 : ${no1}, ${no2}`);
    break;
  }
}

// 🧩 결과
// break 키워드는 💥inner loop만 끝내는 것💥이기 때문에 여전히 step 1의 두번째 컨솔(step 1 : 1) 또한 출력된다!!
// step1 : 0
// step2 : 0, 0
// step1 : 1
// step2 : 1, 0

// 📌 Outer loop에 break 사용할 때는,
// => 라벨(아무 string OK)을 달아준 후, break (라벨)이라고 써주자!
aaa: for (let no1 = 0; no1 < 2; no1++) {
  console.log(`step1 : ${no1}`);

  for (let no2 = 0; no2 < 2; no2++) {
    console.log(`step2 : ${no1}, ${no2}`);
    break aaa; // inner loop가 아닌, outer loop 자체를 끝내버려 위와 다르게 step 1 : 1부터는 진행되지 않음.
  }
}

// 🧩 결과
// step1 : 0
// step2 : 0, 0
