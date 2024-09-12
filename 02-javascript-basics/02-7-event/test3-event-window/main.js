"use strict";

let resultNode;
function printResult(msg) {
  resultNode.innerHTML = msg;
}

addEventListener("load", () => {
  resultNode = document.getElementById("result");
  printResult("load event");
});

addEventListener("resize", () => {
  printResult(`resize, width: ${innerWidth}, height: ${innerHeight}`);
});

addEventListener("copy", (e) => {
  // 유저가 복사한 문자열에 우리가 원하는 문자열을 추가하여 복사하기 위해서..
  let thisURL = document.URL;
  // 브라우저 자체가 가지고 있는 이벤트 처리를 하지 못하도록 기본 이벤트 처리가 되지 않게 해주어야 한다..
  // 복사라고 하면 우리가 이벤트 처리하지 않아도 자동으로 선택한 문자열이 복사문자열로 저장되지만.. 그짓 못하게 preventDefault().
  e.preventDefault();

  // 💡 mime type(소프트웨어 쪽에서 지칭단어) = 데이터 타입
  // : 'text/plain', 'image/*', 'audio/mp3', 'image/jpeg'

  // 그 대신, 내가 원하는 텍스트를 지정해서 Clipboard에 복사할거야.
  // 💡 document.getSelection() - 브라우저에서 유저가 선택한 문자열..
  e.clipboardData.setData(
    "text/plain",
    `${document.getSelection()} - 출처 : ${thisURL}`
  );
});
addEventListener("paste", () => {
  printResult("paste...");
});
