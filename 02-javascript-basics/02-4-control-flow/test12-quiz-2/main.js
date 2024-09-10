"use strict";
/*
const primeTest = () => {
  //어떤 수가 소수인지를 판단, 2부터 증가시켜서 나누어야 한다. ==> loop
  //2부터 입력받은 수까지 증가시키면서 소수인지를 판단한다. ==>loop

  let no = prompt("2 이상의 숫자를 입력하세요");

  // 1) 취소 버튼 : null(object)
  // 2) 입력하지 않고, 확인 버튼 : ''(empty string)
  console.log(no);

  let message = "";

  // ☑️ 입력값(no)을 치지 않았거나(null), 빈칸('')을 입력하거나, string을 입력했을 때 => 빈칸('') 또한 typeof = 'string'이다. (undefined가 아니다!)

  // ☑️ 하지만 ❗️prompt에 입력되는 숫자 또한 스트링으로 간주❗️되기 때문에, typeof no !== "string"으로 스트링이냐 넘버냐를 따지면 아니된다.

  // ☑️ 따라서, isNaN() 함수를 이용해 숫자로 바뀔 수 없는 문자를 뽑아내고, 이때 True라고 나오는 배리어블에 대해
  // isNaN()의 코드 블록 {}안에 '문자'에 대한 코드(ex. 숫자 입력해라!)를 작성.

  // ☑️ 우리가 고려해야할 숫자는 2 이상이며, input(no)가 취소버튼(Null)을 눌렀을 때 제외해야 하기 때문에..
  // (no >= 2 && no !== null)로 조건을 잡아 이 안에서 소수인지 아닌지를 판별하는 알고리즘을 세운다.

  // ☑️ 그럼 마지막 else 블록에는 no === null(취소 or 빈칸+확인)인 경우에만 '장난 치십니까?' 메시지 출력!

  // 🖍️ console.log(Number("")); // 0 => no < 2인 경우로 들어가 아무것도 입력하지 않고 확인버튼 눌렀을 때도 '2 이상 숫자를 입력하세요'가 출력

  if (isNaN(no)) {
    message = `숫자를 입력해 주세요`;
  } else if (no === null) {
    message = `취소 버튼을 누르셨습니다.`;
  } else if (no.trim() === "") {
    message = `빈칸입니다.`;
  } else if (no >= 2 && no !== null) {
    let primes = [];

    for (let i = 2; i <= no; i++) {
      // 각 숫자가 소수일 수도, 아닐 수도 있다 .. 그 결과를 담기 위한 Boolean 변수..
      let isPrime = true;

      for (let j = 2; j < i; j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }

        // 🌱While 반복문 사용🌱
        // let divisor = 2;
        // while (divisor < i) {
        //   if (i % divisor === 0) {
        //     isPrime = false;
        //     break;
        //   } else {
        //     divisor++;
        //   }
        // }
      }

      if (isPrime) {
        primes.push(i);
      }
    }
    message = `입력하신 ${no}까지의 소수는 ${primes.join(",")}입니다.`;
  } else {
    message = `1은 소수도, 합성수도 아닙니다.`;
  }

  document.querySelector("#result").innerHTML = message;
};
*/
