"use strict";

let message = {
  image: document.querySelector(".profile-cover").getAttribute("src"),
  username: document.querySelector(".username").textContent,
  date: document.querySelector(".date").textContent,
  time: document.querySelector(".time").textContent,
  text: document.querySelector(".text").textContent,
  reaction: {
    emoji: document.querySelector(".emoji").textContent,
    count: document.querySelector(".emoji-count").textContent,
  },
};

console.log(message.image);
console.log(message.username);
console.log(message.date);
console.log(message.time);
console.log(message.text);
console.log(message.reaction.emoji);
console.log(message.reaction.count);
