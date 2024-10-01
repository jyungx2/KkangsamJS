"use strict";

/*
메시지 
글 내용
시간
멤버
    멤버 이름
    멤버 아이디
    멤버 프로필사진

이모지들(배열)
    이모지 아이디
    이모지 카운트
    이모지 추가한 멤버들
    멤버 추가 함수

이모지 추가 함수
*/

let message = {
  msg: "디버깅 용도로 많이 사용합니다.",
  date: "2024.09.04 오전 10:32",

  member: {
    id: "lee",
    nickname: "12. 이지영",
    photo: "lee.png",
  },

  emojis: [
    {
      emojiId: "thumsup",
      count: 1,
      members: ["lee"],
      // ❓ emoji 객체 안에 add function을 왜 추가해야 하는지?
      // => 중복되는 이모지는 객체를 따로 만들어서 배열에 추가하는 것이 아닌, 원래 있던 이모지 객체의 count property를 하나씩 더하고, 이때 멤버아이디는 중복될 일이 없으므로, 멤버 어레이에도 memberid를 Push하여 넣어주기 위해서..
      add: function (memberId) {
        this.count++;
        this.members.push(memberId);
      },
    },
  ],

  addEmoji: function (emojiId, memberId) {
    // 1. 새로운 이모지를 추가할 때,
    // : emojis 배열에 있는 이모지 객체들 중에서 '하나라도' 입력된 이모지 아이디와 같지 않으면
    // (=즉 배열의 모든 요소가 입력된 이모지 아이디값과 일치하지 않으면 새로운 이모티콘이므로..)
    if (this.emojis.every((item) => item.emojiId !== emojiId)) {
      this.emojis.push({
        id: emojiId,
        count: 1,
        members: [memberId],
        add: function (memberId) {
          this.count++;
          this.members.push(memberId);
        },
      });
    } else {
      // 2. 중복되는 이모지를 추가할 때,
      //: 해당 이모지객체를 findIndex로 찾아 count수와 멤버를 배열에 푸쉬하는 add function을 실행!
      let index = this.emojis.findIndex((item) => item.emojiId === emojiId);
      this.emojis[index].add(memberId);
    }
  },
};

function Member(id, nickname, photo) {
  this.id = id;
  this.nickname = nickname;
  this.photo = photo;
}

function Emoji(emojiId) {
  this.emojiId = emojiId;
  this.count = 0;
  this.member = []; // emoji를 추가한 멤버들을 Push
  this.add = function (memberId) {
    this.member.push(memberId);
    this.count++;
  };
}

function Message(msg, member) {
  this.msg = msg;
  this.date = new Date().toLocaleDateString();
}
