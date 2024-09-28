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
  //   this.add = function (memberId) {
  //     this.count++;
  //     this.members.push(memberId);
  //   };
  // 💥함수는 prototype으로 저장해야 메모리효율성 높일 수 있다.
  Emoji.prototype.add = function (memberId) {
    this.count++;
    this.members.push(memberId);
  };
}

function Message(msg, member) {
  this.msgId = ++msgId;
  this.msg = msg;
  this.member = member;

  this.date = new Date().toLocaleString();
  this.emojis = [];

  //   this.addEmoji = function (emojiId, memberId) {
  //     if (this.emojis.every((item) => item.emojiId !== emojiId)) {
  //       let emoji = new Emoji(emojiId);
  //       emoji.add(memberId);
  //       this.emojis.push(emoji);
  //     } else {
  //       let index = this.emojis.findIndex((item) => item.emojiId === emojiId);
  //       this.emojis[index].add(memberId);
  //     }
  //   };

  Message.prototype.addEmoji = function (emojiId, memberId) {
    if (this.emojis.every((item) => item.emojiId !== emojiId)) {
      let emoji = new Emoji(emojiId);
      emoji.add(memberId);
      this.emojis.push(emoji);
    } else {
      let index = this.emojis.findIndex((item) => item.emojiId === emojiId);
      this.emojis[index].add(memberId);
    }
  };
}

// 전체 채팅 메시지가 저장되는 배열, Message 객체 여러개가 저장
let messages = [];
let msgId = 0;

// 필요한 돔노드 객체 획득..
let nicknameInput = document.getElementById("nicknameInput");
let idInput = document.getElementById("idInput");
let msgInput = document.getElementById("msgInput");
let chatMain = document.getElementById("chat-main");

// 2️⃣ 매개변수로 전달된 객체의 내용을 node로 만들어서 출력시키는 역할.
const printMessage = function (message) {
  // 📌 Dropdown menu (...)
  let menuImage = document.createElement("img");
  menuImage.setAttribute("src", "images/menu.jpg");

  let menuButton = document.createElement("button");
  menuButton.setAttribute("class", "msg-info-menu dropbtn");
  menuButton.appendChild(menuImage);

  //  📌 Link 1
  let link1 = document.createElement("a");
  link1.setAttribute("href", "#");
  link1.setAttribute("onclick", `clickEmoji('${message.msgId}', 'thumbup')`);
  let link1Text = document.createTextNode("좋아요");
  link1.appendChild(link1Text);

  //  📌 Link 2
  let link2 = document.createElement("a");
  link2.setAttribute("href", "#");
  link2.setAttribute("onclick", `clickEmoji('${message.msgId}', 'ok')`);
  let link2Text = document.createTextNode("넵");
  link2.appendChild(link2Text);

  let links = document.createElement("div");
  links.setAttribute("class", "dropdown-content");
  links.appendChild(link1);
  links.appendChild(link2);

  // 👉 dropdown 디브 안에 메뉴 버튼과 링크 2개 넣기!
  let dropdown = document.createElement("div");
  dropdown.setAttribute("class", "dropdown");
  dropdown.appendChild(menuButton);
  dropdown.appendChild(links);

  // 📌 main data - 이름
  let name = document.createElement("div");
  name.setAttribute("class", "msg-info-name");
  name.appendChild(document.createTextNode(message.member.nickname));

  // 📌 main data - 시간날짜
  let date = document.createElement("div");
  date.setAttribute("class", "msg-info-time");
  date.appendChild(document.createTextNode(message.date));

  // 👉 이름과 시간날짜를 msgInfo 디브로 묶는다.
  let msgInfo = document.createElement("div");
  msgInfo.setAttribute("class", "msg-info");
  msgInfo.appendChild(name);
  msgInfo.appendChild(date);
  msgInfo.appendChild(dropdown);

  // 📌 msg-text > 실제 메시지 내용
  let msgText = document.createElement("div");
  msgText.setAttribute("class", "msg-text");
  msgText.appendChild(document.createTextNode(message.msg)); // 💥

  // 💡 emojis 디브는 나중에 이모지가 추가될 때 만들고 붙여야 하므로 여기서 쓰지 ❌

  // 👉 msg-bubble 디브 만들고 몽땅 넣어버리기
  let msgBubble = document.createElement("div");
  msgBubble.setAttribute("class", "msg-bubble");
  msgBubble.appendChild(msgInfo);
  msgBubble.appendChild(msgText);

  // 📌 프로필 사진
  let photo = document.createElement("img");
  photo.setAttribute("src", message.member.photo);
  photo.setAttribute("class", "msg-img");

  // 📌 메시지 루트 태그 준비 (프사(msg-img) + msg-bubble)
  let mainNode = document.createElement("div");
  mainNode.setAttribute("id", `msgId-${message.msgId}`);
  mainNode.setAttribute("class", "msg left-msg");

  //  👉 프사와 메시지 버블을 루트 태그에 넣기
  mainNode.appendChild(photo);
  mainNode.appendChild(msgBubble);

  // ✅ msgId-1,2... 여러 메시지를 모두 모아 화면에 출력
  chatMain.appendChild(mainNode);
};

// send 버튼 눌렀을 때, 동적으로 요소를 만들어 chat-main 바디부분에 추가한다.
const sendMessage = function (e) {
  e.preventDefault();

  let id = idInput.value;
  let nickname = nicknameInput.value;
  let msg = msgInput.value;

  if (
    id.trim().length === 0 ||
    nickname.trim().length === 0 ||
    msg.trim().length === 0
  ) {
    alert("아이디, 닉네임과 메시지를 입력해야 합니다.");
    return;
  } else {
    idInput.value = "";
    nicknameInput.value = "";
    msgInput.value = "";

    // 📌 메시지 입력 유저를 표현하는 객체 생성
    let member = new Member(id, nickname, `images/${id}.jpg`);

    // 📌 메시지 객체 생성
    let message = new Message(msg, member);
    messages.push(message);
    printMessage(message);
  }
};

const printEmoji = function (message) {
  // 하나의 메시지에 이모지는 이미 여러개 추가되었을 수도..
  let emojis = message.emojis;
  if (emojis.length > 0) {
    // 이모지가 출력되어야 하는 노드를 획득
    let messageBubble = document.querySelector(
      `#msgId-${message.msgId} .msg-bubble`
    );

    // 이모지가 기존에 추가된 것이 있을 수도 있고 없을 수도 있고..
    let emojiNode = messageBubble.querySelector(".emojis");
    // > 이미 있던 거라면 모두 지우고 새로 추가하는 방식 채택
    if (emojiNode) {
      messageBubble.removeChild(emojiNode);
    }

    //
    let emojisNode = document.createElement("div");
    emojisNode.setAttribute("class", "emojis");

    emojis.forEach((emoji) => {
      // emojis 요소 > dropdown > emoji dropbtn 준비
      let img = document.createElement("img");
      img.setAttribute("class", "emoji dropbtn");
      img.setAttribute("src", `images/${emoji.emojiId}.jpg`);

      // emojis 요소 > dropdown > dropdown-content 준비
      // 1) 일단 span 준비
      let span = document.createElement("span");
      let nicknameTxt = emoji.members.join(",");
      span.appendChild(document.createTextNode(nicknameTxt));

      // 2) span을 감싸는 div 준비
      let dropdownContent = document.createElement("div");
      dropdownContent.setAttribute("class", "dropdown-content");

      // 3) span을 div에 넣기
      dropdownContent.appendChild(span);

      // 4) dropdown 요소 만들고, img & dropdownContent 넣기
      let dropdown = document.createElement("div");
      dropdown.setAttribute("class", "dropdown");
      dropdown.appendChild(img);
      dropdown.appendChild(dropdownContent);

      // 5) 이모지 카운트 요소 준비
      let span2 = document.createElement("span");
      span2.setAttribute("class", "emoji-count");
      span2.appendChild(document.createTextNode(`${emoji.count}`));

      // 6) emojis 노드에 추가
      emojisNode.appendChild(dropdown);
      emojisNode.appendChild(span2);
    });
    // emojiNode는 지우고, 새로 만든 emojisNode를 추가!
    messageBubble.appendChild(emojisNode);
  }
};

// 3️⃣ 이모지 추가 함수 선언
const clickEmoji = function (msgId, emojiId) {
  let memberId = prompt("멤버 id를 입력해주세요.");
  if (memberId === null) {
    alert("입력하지 않았습니다.");
  } else {
    let index = messages.findIndex((item) => item.msgId === msgId);
    messages[index].addEmoji(emojiId, memberId);

    printEmoji(messages[index]);
  }
};
