"use strict";

// 메시지: 글내용/시간/멤버이름/유저아이디/유저프로필사진/이모지아이디/이모지카운트/이모지추가한멤버들

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
    id: "leeJY",
    nickname: "12. 이지영",
    photo: "leeJY.png",
  },
  emojis: [
    {
      id: "thumsup",
      count: 1,
      members: ["leejy"],
      add: function (id) {
        this.count++;
        this.members.push(id);
      },
    },
  ],
  addEmoji: function (emojiId, memberId) {
    // 1️⃣ 신규 이모지 추가
    if (this.emojis.every((item) => item.id !== emojiId)) {
      this.emojis.push({
        id: emojiId,
        count: 1,
        members: [memberId],
        add: function (id) {
          this.count++;
          this.members.push(id);
        },
      });
    } else {
      // 2️⃣ 기존에 추가돼있던 이모지를 카운팅만 업
      // 배열에서 이미지 Id의 객체가 몇번째 있는지 획득..
      let index = this.emojis.findIndex((item) => item.id === emojiId);
      this.emojis[index].add(memberId);
    }
  },
};

console.log(message);

// 📌 기존 이모지에 kim이 추가했다고 가정..
message.addEmoji("thumsup", "kim");
console.log(message);

// 📌 ok라는 이모지를 Lee가 추가했다는 가정. 새로운 이모지 추가..
message.addEmoji("ok", "lee");
console.log(message);
