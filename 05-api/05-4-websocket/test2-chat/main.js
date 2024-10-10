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
  //   this.msgId = ++msgId; // 메시지마다 식별하기 위해.. // 🚨
  this.msg = msg;
  this.member = member; // 여기다가 new Member() 생성자함수 쓰면 안된다!!
  // member 파라미터가 이미 객체형태로 들어올 것이기 때문에 그냥 member로..

  this.date = new Date().toLocaleString();
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
// let msgId = 0;
// 👉 실제 채팅이 되게 할 것이다.. 각각의 메시지를 구분하기 위한 Id이다..
// 더 이상 프론트가 아닌, server에서 유지해야 하는 데이터이다..
// let msgId = 0

// 👉 클라이언트 정보.. 현 창을 이용하는 정보, connect시에 초기화
let member;
// 👉 서버 연결 정보..
let webSocket;

// 필요한 돔노드 객체 획득..
let nicknameInput = document.getElementById("nicknameInput");
let idInput = document.getElementById("idInput");
let msgInput = document.getElementById("msgInput");
let chatMain = document.getElementById("chat-main");

// 👉 입력 Form 노드 추가..
let nicknameForm = document.getElementById("nicknameForm");
let msgForm = document.getElementById("msgForm");

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
  // >> 링크가 필요하긴 한데, 특정 Url로 갈 필요가 없는 경우 #을 준다.

  link1.setAttribute("onclick", `clickEmoji('${message.msgId}', 'thumbup')`);
  // >> 🌟어느 이모지냐는 'thumup' : emojiId
  // >> 🌟이 이모지가 어느 메시지에 들어가냐 식별할 수 있게 도와주는 id : message.msgId

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
  // 객체(message)안에 객체(member)가 있는 것. Member안에 정의된 nickname 겟!

  // 📌 main data - 시간날짜
  let date = document.createElement("div");
  date.setAttribute("class", "msg-info-time");
  date.appendChild(document.createTextNode(message.date));

  // 👉 이름과 시간날짜를 위에서 만든 dropdown과 함께 msgInfo 디브로 묶는다.
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
  // 화면에 메시지는 여러개 추가된다.. 각 div태그를 id로 식별해야 나중에 메시지에
  // 특정 이모지 추가시 어느 div에 출력해야 하는지 식별할 수 있다.
  let mainNode = document.createElement("div");
  mainNode.setAttribute("id", `msgId-${message.msgId}`);
  mainNode.setAttribute("class", "msg left-msg");

  //  👉 프사와 메시지 버블을 루트 태그에 넣기
  mainNode.appendChild(photo);
  mainNode.appendChild(msgBubble);

  // ✅ msgId-1,2... 여러 메시지를 모두 모아 화면에 출력
  chatMain.appendChild(mainNode);
};

// connect function
function connect(e) {
  e.preventDefault();

  // 유저 입력 데이터 획득..
  let id = idInput.value;
  let nickname = nicknameInput.value;

  // 유효성 검증..
  if (id.trim().length === 0 || nickname.trim().length === 0) {
    alert("아이디, 닉네임을 입력해야 합니다.");
    return;
  } else {
    // 유저 입력 데이터 화면 삭제..
    idInput.value = "";
    nicknameInput.value = "";

    member = new Member(id, nickname, `images/${id}.jpg`);

    // 서버 연결.. (주된 업무)
    webSocket = new WebSocket("ws://localhost:3000");

    // 넘겨와진 데이터를 받기 위한 코드
    webSocket.onmessage = onMessage;
  }
}

// send 버튼 눌렀을 때, 동적으로 요소를 만들어 chat-main 바디부분에 추가한다.
const sendMessage = function (e) {
  e.preventDefault();
  // 유저 입력 데이터 추출...
  // 💫 id & nickname => connect function으로..
  //   let id = idInput.value;
  //   let nickname = nicknameInput.value;
  let msg = msgInput.value;

  // 유효성 검증..
  if (
    // id.trim().length === 0 ||
    // nickname.trim().length === 0 ||
    msg.trim().length === 0
  ) {
    alert("아이디, 닉네임과 메시지를 모두 입력해야 합니다.");
    return;
  } else {
    // 유저 입력 데이터 화면에서 삭제...
    // 💫 id & nickname => connect function으로..
    // idInput.value = "";
    // nicknameInput.value = "";
    msgInput.value = "";

    // 📌 메시지 입력 유저를 표현하는 객체 생성
    // * photo: 프사는 유저 id와 동일한 파일명을 가진다고 가정.
    // let member = new Member(id, nickname, `images/${id}.jpg`);

    // 📌 메시지 객체 생성
    let message = new Message(msg, member);
    messages.push(message);

    // 화면에 동적 노드 만들어서 출력.. => 1️⃣ 코드가 길고, 단일업무이므로 따로 함수로 빼자.
    // 메시지를 화면 출력 => 여기다 작성해도 되지만, 화면출력 관련 함수는 너무 길어질 가능성이 크므로, 함수로 따로 뺀다.
    printMessage(message);

    // message 객체에 변수 추가.. 메시지를 구분하기 위해..
    message.gubun = "msg";

    // 서버에 전송
    webSocket.send(JSON.stringify(message));
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
      span.appendChild(document.createTextNode(nicknameTxt)); //💥

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
  // 동적으로 이모지를 메시지에 출력..
  // 서버와 연동된다면 이모지 출력 유저의 ID는 고정되지만..
  // 지금은 로컬 테스트임으로 이모지 추가 유저 Id를 테스트를 위해서 Prompt로 받아들인다.
  /*
  let memberId = prompt("멤버 id를 입력해주세요.");
  if (memberId === null) {
    alert("입력하지 않았습니다.");
  } else {
    // 화면에 메시지는 많다.. 모든 메시지의 이모지 추가 클릭하면 이 함수가 호출된다.
    // 결국 어느 메시지에서 이모지를 클릭한 것인지가 식별되어야 하기 때문에
    // Html을 준비할 때 매개변수로 msgId를 받아들였던 것.
    let index = messages.findIndex((item) => item.msgId === msgId);
    messages[index].addEmoji(emojiId, memberId); // memberId -> 객체로 만들어서 해도 OK

    // 해당 메시지에 이모지 추가해 출력
    printEmoji(messages[index]);
  }
  */

  let emoji = new Emoji(emojiId);
  emoji.memberId = member.id;
  emoji.msgId = msgId;
  emoji.gubun = "emoji";

  // 서버 전송
  webSocket.send(JSON.stringify(emoji));

  function onMessage(event) {
    // 서버 데이터 획득.. object literal로 변환..
    // 서버쪽 데이터와 약속이 돼있어야 함 (ws.send(state: 'ok'))
    let serverData = JSON.parse(event.data);
    if (serverData.gubun === "connect") {
      if (serverData.state === "ok") {
        nicknameForm.style.display = "none";
        msgForm.removeAttribute("style");
      } else {
        alert("서버 연결에 실패 했습니다.");
      }
    } else if (serverData.gubun === "msg") {
      let message = new Message(serverData.msg, serverData.member);
      message.msgId = serverData.msgId;
      messages.push(message);
      printMessage(message);
    } else if (serverData.gubun === "emoji") {
      let index = messages.findIndex(
        (item) => item.msgId === parseInt(serverData.msgId)
      );
      messages[index].addEmoji(serverData.emojiId, serverData.memberId);
      printEmoji(messages[index]);
    }
  }
};
