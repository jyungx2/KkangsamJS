"use strict";

let websocket;
let nickname;
let resultNode;
let msgNode;

function connection() {
  let nicknameNode = document.getElementById("nickname");
  resultNode = document.getElementById("results");
  msgNode = document.getElementById("msg");

  nickname = nicknameNode.value.trim();
  if (nickname) {
    // 서버와 연결..
    webSocket = new WebSocket("ws://localhost:3000");

    let connectNode = document.getElementById("connectDiv");
    let msgNode = document.getElementById("msgDiv");
    let nicknameResultNode = document.getElementById("nicknameResult");

    msgNode.style.display = "block"; // html file안에는 none -> block으로 바꿔 display
    connectNode.style.display = "none";
    nicknameResultNode.innerHTML = nickname;
  } else {
    alert("nickname 을 입력해 주세요");
  }

  nicknameNode.value = ""; // 유저가 입력한 데이터 삭제

  // 서버에서 데이터 들어올 때 (데이터 수신: 우리 입장에서 원할 때 받는데, 이벤트가 발생할 때만 받을 수 있으므로 Onmessage)
  webSocket.onmessage = () => {
    let liNode = document.createElement("li");
    let jsonData = JSON.parse(event.data); // 서버에서 받은 데이터를 JS 객체로 변환.

    liNode.innerHTML = `jsonData.nickname ? ${jsonData.nickname} => ${jsonData.msg} : ${jsonData.msg}`;
    resultNode.appendChild(liNode);
  };
}

// 데이터 전송
function send() {
  let msg = msgNode.value.trim();
  if (msg) {
    webSocket.send(
      JSON.stringify({
        nickname, // nickname = nickname
        msg, // msg = msg
      })
    );

    let liNode = document.createElement("li");
    liNode.innerHTML = `${nickname} => ${msg}`;
    resultNode.appendChild(liNode);
  } else {
    alert("메시지를 입력해 주세요.");
  }
}
