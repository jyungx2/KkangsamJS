"use strict";
// 반복적으로 생성될 객체 도출..
// member = {
//     id: memberId,
//     nickname: memberNickname,
//     photo: "leeJY.png",
//   };

function Member(id, nickname, photo) {
  this.id = id;
  this.nickname = nickname;
  this.photo = photo;
}

// emoji ={
//     id: emojiId,
//     count: 1,
//     members: [memberId],
//     add: function (id) {
//     this.count++;
//     this.members.push(id);
//     },
//   }

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

// 메시지가 여러개 생성되는 구조이다..
// 전체 메시지를 담기 위한 배열..
// 메시지 객체 여러개를 담는 배열..
let messages = [];

// 메시지 객체 여러개가 유지된다..
// 각각의 메시지 객체를 식별해서 사용해야 한다..
// 메시지 식별자로 사용하기 위한 변수.. 메시지 객체 만들어 질때마다 1씩 증가시켜서 사용하겠다..
let msgId = 0;

// 신규 메시지 발생1
let member1 = new Member("kim", "김길동", "kim.png");
let message1 = new Message("첫번째 메시지..", member1);
messages.push(message1);
console.log(messages);
console.dir(messages);

// 신규 메시지 발생2
let member2 = new Member("lee", "이길동", "lee.png");
let message2 = new Message("두번째 메시지...", member2);
messages.push(message2);
console.dir(messages);

// park이 첫번째 메시지에 Ok 이모지를 추가했다는 가정..
message1.addEmoji("ok", "park");
console.dir(messages);

// Choi이, 첫번째 메시지에 thumbsup 이모지 추가..
message1.addEmoji("thumbsup", "choi");
console.dir(messages);

message1.addEmoji("ok", "jeong");
console.dir(messages);
