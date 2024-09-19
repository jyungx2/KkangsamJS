"use strict";
// ✅ window.inner(outer)Width / window.inner(outer)Height
// window의 기본 정보 추출...
console.log(window.innerWidth, window.innerHeight);
console.log(window.outerWidth, window.outerHeight);

// ✅ screenLeft / screenTop / screenRight / screenBottom
// 노트북 스크린 기준으로 윈도우 창이 얼마만큼 떨어져 있냐
console.log(window.screenLeft, window.screenTop);

// 스크롤 정보는 스크롤 이벤트가 발생한 경우만 유지...
window.addEventListener("scroll", () => {
  console.log(window.scrollX, window.scrollY);
});

// ✅ window.open() 함수
// 새로운 tap으로 새창이 뜬다...
// target을 지정하지 않으면 default값으로 _blank가 설정됨 => 새 창 띄움
function myOpen1() {
  window.open("http://www.google.com");
  // 구글 홈페이지를 새 창으로 띄운다.
}

// 자신의 탭 안에 새창이 뜬다.. 아예 자신의 창이 바껴버린다.
function myOpen2() {
  window.open("https://www.google.com", "_self");
  //   구글 홈페이지를 자기 창에 띄운다.
}

// 자식창 지칭 객체...
let childWindow;

// option 정보를 지정하면 새창(브라우저 X)이 아닌, 다이올로그처럼 띄운다.
function myOpen3() {
  // 다시 닫히게 하고 싶으면 글로벌 스콥에 변수 선언해줘야 Close 함수에도 쓸 수 있다!
  childWindow = window.open(
    "http://www.naver.com",
    "_blank",
    "left=100, top=100, width=300, height=400"
  );

  if (childWindow == null) {
    alert("팝업이 차단되었습니다. 해제해 주세요..");
  }
}

// 💥 myOpen3로 열린 구글 페이지가 close btn눌렀을 때 안 닫히는 이유!
// 구글쪽에서 JS코드 자체를 이 함수가 적용이 안되게 조작한 것. 로직 자체 문제 X
function myClose() {
  console.log("11", childWindow);
  if (!childWindow?.closed) {
    childWindow.close();
  }
  // 현재 객체가 지칭하고 있는 차일드 창을 삭제!
}

function myScroll() {
  window.scrollBy(100, 100);
  //   scroll 버튼 누르는 순간 내려감!
}
