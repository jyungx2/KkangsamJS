"use strict";

function Member(id, nickname, photo) {
  this.id = id;
  this.nickname = nickname;
  this.photo = photo;
}

function Emoji(emojiId) {
  this.emojiId = emojiId;
  this.count = 0;
  this.members = [];
  this.add = function (memberId) {
    this.count++;
    this.members.push(memberId);
  };
}

function Message(msg, member) {
  this.msgId = ++msgId; // 메시지마다 식별하기 위해..
  this.msg = msg;
  this.member = member; // 여기다가 new Member() 생성자함수 쓰면 안된다!!
  // member 파라미터가 이미 객체형태로 들어올 것이기 때문에 그냥 member로..

  this.date = new Date().toLocaleDateString();
  this.emojis = [];

  this.addEmoji = function (emojiId, memberId) {
    if (this.emojis.every((item) => item.emojiId !== emojiId)) {
      let emoji = new Emoji(emojiId); // 이모지 객체를 새로 만들고, 이모지 객체 안에 있는 함수를 실행시켜야 한다. (밑의 코드)
      emoji.add(memberId); // ⭐️ 객체를 불러오고나서 그 객체안에있는 Add함수를 실행시켜야 카운트가 올라가고 멤버스에 멤버가 추가됨!!
      // 그냥 푸쉬만 눌러주면 빈 객체로만 업데이트 되겠지..
      this.emojis.push(emoji);
    } else {
      let index = this.emojis.findIndex((item) => item.emojiId === emojiId);
      this.emojis[index].add(memberId);
    }
  };
}

// 전체 채팅 메시지가 저장되는 배열, Message 객체 여러개가 저장
let messages = [];
// 📌 채팅 메시지를 식별해야 이모지를 어디다 추가할건지가 결정될 수 있어서..
// 1씩 증가시켜서.. 신규 발생 채팅 메시지 식별자 id(msgId)로 사용하기 위해서..
let msgId = 0;

// 필요한 돔노드 객체 획득..
const nicknameInput = document.getElementById("nicknameInput");
const idInput = document.getElementById("idInput");
const msgInput = document.getElementById("msgInput");
const chatMain = document.getElementById("chat-main");

// 2️⃣ 매개변수로 전달된 객체의 내용을 node로 만들어서 출력시키는 역할.
const printMessage = function () {};

// send 버튼 눌렀을 때, 동적으로 요소를 만들어 chat-main 바디부분에 추가한다.
const sendMessage = function (e) {
  e.preventDefault();
  // 유저 입력 데이터 추출...
  let id = idInputNode.value;
  let nickname = nicknameInput.value;
  let msg = msgInput.value;

  // 유효성 검증..
  if (
    id.trim().length === 0 ||
    nickname.trim().length === 0 ||
    msg.trim().length === 0
  ) {
    alert("아이디, 닉네임과 메시지를 입력해야 합니다.");
    return;
  } else {
  }

  // 화면에 동적 노드 만들어서 출력.. => 1️⃣ 코드가 길고, 단일업무이므로 따로 함수로 빼자.
};

const printEmoji = function (message) {};

// 3️⃣ 이모지 추가 함수 선언
const clickEmoji = function (e) {
  // 동적으로 이모지를 메시지에 출력..
};
