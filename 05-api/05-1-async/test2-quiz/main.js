"use strict";

const btnShow = document.querySelector(".btn--show");
const stopWatch = document.querySelector(".stopwatch");

btnShow.addEventListener("click", function () {
  const updateClock = function () {
    const now = new Date();
    const hours = (now.getHours() + "").padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = (now.getSeconds() + "").padStart(2, 0);

    stopWatch.innerHTML = `${hours} : ${minutes} : ${seconds}`;
  };

  // 처음 버튼 클릭 시 즉시 시간 업데이트
  updateClock();

  const timewatch = setInterval(updateClock, 1000);

  const btnHide = document.createElement("button");
  const btnHideTxt = document.createTextNode("Hide");
  btnHide.setAttribute("class", "btn--hide");
  btnHide.appendChild(btnHideTxt);

  btnShow.insertAdjacentElement("afterend", btnHide);
  this.remove();

  // hide 버튼 눌렀을 때 시계가 사라지고, show 버튼이 돌아온다.
  btnHide.addEventListener("click", function () {
    // 버튼: Show <-> Hide
    btnHide.insertAdjacentElement("afterend", btnShow);
    this.remove();

    // 시계 사라짐
    clearInterval(timewatch);
    stopWatch.innerHTML = "";
  });
});

// ❓ 처음에 show 버튼 눌렀을 때 초시계가 바로 나오지 않고, 1초 정도의 약간의 딜레이가 생기는데, 이유가 무엇인가요?
// setInterval() 함수는 지정된 시간 이후에 처음 호출되기 때문에, btnShow 버튼을 처음 클릭하면 1초 후에 첫 업데이트가 이루어지면서 약간의 딜레이가 발생해. 이를 해결하기 위해 setInterval() 호출 이전에 즉시 한 번 시간을 업데이트하는 코드를 추가하면 돼.

// setInterval() (... 초시계 함수)을 바로 작성하지 말고, 함수 부분만을 변수로 정의한 다음, 이 함수만 한 번 따로 불러온 뒤, setInterval() 함수를 불러오자.
// updateClock();
