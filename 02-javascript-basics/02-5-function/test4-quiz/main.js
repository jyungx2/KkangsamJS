"use strict";

function calcBonus(name, position, income) {
  let bonus;
  //   if (position === "A") {
  //     bonus = income * 0.3;
  //   } else if (position === "B") {
  //     bonus = income * 0.2;
  //   } else {
  //     bonus = income * 0.1;
  //   }
  //   console.log(`${name}의 추석 보너스는 ${bonus} 입니다.`);

  // 📌 switch-case문을 쓰기 아주 좋은 예문!
  switch (position) {
    case "A":
      bonus = income * 0.3;
      break;
    case "B":
      bonus = income * 0.2;
      break;
    case "C":
      bonus = income * 0.1;
      break;
  }
  console.log(`${name}의 추석 보너스는 ${bonus} 입니다.`);
}

calcBonus("홍길동", "A", 1000);
calcBonus("김길동", "B", 500);
