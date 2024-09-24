"use strict";

const image = document.querySelector(".profile-cover").getAttribute("src");
const username = document.querySelector(".username").textContent;
const time = document.querySelector(".time").textContent;
const text = document.querySelector(".text").textContent;
const emoji = document.querySelector(".emoji").textContent;
const count = document.querySelector(".emoji-count").textContent;

let message = {
  image,
  username,
  newDate: function () {},
  time,
  text,
  reaction: {
    emoji,
    count,
  },
};

console.log(message.image);
console.log(message.username);
// console.log(message.date);
console.log(message.time);
console.log(message.text);
console.log(message.reaction.emoji);
console.log(message.reaction.count);

const date = new Date().toISOString();
const date2 = new Date().toLocaleString();
console.log(date);
console.log(date2);
