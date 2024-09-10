"use strict";

let i = 1;
while (i < 10) {
  document.write(`<div><h3>${i}단<h3>`);

  // outer안에서 inner loop문 자체만을 반복하기 위한 변수 선언.
  let j = 1;
  while (j < 10) {
    document.write(`<p>${i} X ${j} = ${i * j}</p>`);
    j++;
  }

  document.write(`</div>`);
  i++;
}
