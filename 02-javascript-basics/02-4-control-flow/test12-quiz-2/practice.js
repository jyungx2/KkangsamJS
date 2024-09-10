"use strict";

const primeTest = () => {
  let no = prompt("2 이상의 숫자를 입력하세요");

  let message = "";

  if (no === null || isNaN(no) || no < 2 || Number()) {
    message = `2 이상 숫자를 입력하세요.`;
  } else if (Number(no) === 1) {
    message = `1은 합성수도, 소수도 아닙니다.`;
  } else {
    let primes = [];
    for (let i = 2; i <= no; i++) {
      let isPrime = true;
      for (let j = 2; j < i; j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }

      if (isPrime) {
        primes.push(i);
      }
    }

    message = `입력하신 ${no}까지의 소수는 ${primes.join(",")}입니다.`;
  }

  document.querySelector("#result").innerHTML = message;
};
