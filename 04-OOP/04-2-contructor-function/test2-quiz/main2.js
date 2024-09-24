function Member(id, nickname, photo) {
  this.id = id;
  this.nickname = nickname;
  this.photo = photo;
}

function Emoji(id, memberId) {
  this.id = id;
  this.count = 1;
  this.members = [memberId];

  this.add = function (id) {
    this.count++;
    this.members.push(id);
  };
}

function Message(msg, member) {
  this.msg = msg;
  this.memeber = member;

  this.emojis = [];

  this.addEmoji = function (emojiId, memberId) {
    if (this.emojis.every((item) => item.id !== emojiId)) {
      let newEmoji = new Emoji(emojiId, memberId);
      this.emojis.push(newEmoji);
    } else {
      let index = this.emojis.findIndex((item) => item.id === emojiId);
      this.emojis[index].add(memberId);
    }
  };
}

let member1 = new Member("donghwan", "iamodh", "cat.jpg");
let message1 = new Message("Hello", member1);
console.log(message1);

message1.addEmoji("thumbup", "kim");

message1.addEmoji("thumbup", "lee");

message1.addEmoji("ok", "lee");
console.log(message1);
