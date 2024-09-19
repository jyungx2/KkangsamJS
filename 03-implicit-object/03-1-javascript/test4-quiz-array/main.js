"use strict";

// 인풋 요소
let wordNode = document.querySelector(".word");
// 인풋이 출력되는 디브
let wordlistNode = document.getElementById("wordlist");

// 버튼노드 4개
let addbtnNode = document.getElementById("addbtn");
let mapbtnNode = document.getElementById("mapbtn");
let filterbtnNode = document.getElementById("filterbtn");
let sortbtnNode = document.getElementById("sortbtn");

// 단어들이 입력되는 배열
let words = [];

function printWord(array) {
  let result = "";
  array.forEach((word) => {
    result += `<li>${word}</li>`;
  });
  wordlistNode.innerHTML = result;
}

// Add button
addbtnNode.addEventListener("click", function () {
  let word = wordNode.value;
  // 추가할 단어 - push method

  words.push(word);
  printWord(words);

  // 새로운 li 요소 생성 및 추가
  //   let wordList = document.createElement("li");
  //   wordList.textContent = word;
  //   wordlistNode.appendChild(wordList);

  wordNode.value = ""; // 인풋 필드 초기화
});

// Map button
mapbtnNode.addEventListener("click", function () {
  let mappedArray = words.map((word) => word.toUpperCase());

  printWord(mappedArray);
});

// Filter button
filterbtnNode.addEventListener("click", function () {
  let filteredArray = words.filter((word, i) => word.length > 5);

  printWord(filteredArray);
});

// Sort button
sortbtnNode.addEventListener("click", function () {
  let sortedArray = words.sort((a, b) => b - a);

  printWord(sortedArray);
});
