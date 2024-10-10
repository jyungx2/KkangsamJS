"use strict";
function saveSessionStorage() {
  let key = document.getElementById("key").value;
  let value = document.getElementById("value").value;

  // session storage에 setItem()함수를 사용해 key와 value 형태로 저장.
  sessionStorage.setItem(key, value);
}

function saveLocalStorage() {
  let key = document.getElementById("key").value;
  let value = document.getElementById("value").value;

  // local storage에 setItem()함수를 사용해 key와 value 형태로 저장.
  localStorage.setItem(key, value);
}

function openNewWindow() {
  window.open("one.html");
}

// storage 이벤트 리스너의 callback function
// storage event 객체를 매개변수로 받는다.
// 이 객체 상에서 여러가지 값 활용 가능.
window.addEventListener("storage", (event) => {
  console.log("I am index.html"); // 💥local/session storage에 저장시, 얘는 콜되지 않음 (오직 two.html만 찍힘.)
  console.log("스토리지 이벤트 발생");
  console.log(`url : ${event.url}`);

  if (event.storageArea === sessionStorage) {
    console.log("sessionStorage event 발생..");
  } else if (event.storageArea === localStorage) {
    console.log("localStorage event..");
  }
  console.log(
    `key: ${event.key}, ${event.oldValue} 에서 ${event.newValue}로 변경`
  );
});

window.addEventListener("storage", (event) => {
  console.log("I am index.html");
  console.log("스토리지 이벤트 발생");
  console.log(`url : ${event.url}`);

  if (event.storageArea === sessionStorage) {
    console.log("sessionStorage event 발생..");
  } else if (event.storageArea === localStorage) {
    console.log("localStorage event..");
  }
  console.log(
    `key: ${event.key}, ${event.oldValue} 에서 ${event.newValue}로 변경`
  );
});

// sessionstorage - 1 , localstorage - a 저장했을 때,
// 검사 - application 창 열어보면,
// 💥localstorage: a만 있다.
// 💥sessionstorage: 1이라는 데이터가 없다. (=)

// one.html
// window, link로 눌렀을 때랑 sessionstorage가 복사여부가 다르다.
// window로 누르면 저장되고 Link로 누르면 저장 안됨.
// window.open으로 눌렀을 때만 원래 가지고 있던 session storage가 복사되는 것.

// sessionStorage 이벤트 발생 범위 check
// Localstorage 이벤트 발생 범위 check
// 자기 자신쪽에서는 이벤트가 발생하지 않는다. (= 콜백함수 실행 ❌)
