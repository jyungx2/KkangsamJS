"use strict";

let fileNode = document.getElementById("filepicker");
let resultNode = document.getElementById("results");

const handleFile = function (e) {
  while (resultNode.firstChild) {
    resultNode.removeChild(resultNode.firstChild);
  }

  //   let files = e.target.files;
  let files = fileNode.files; // input태그에 파일이 들어가있으므로..

  if (files.length !== 0) {
    for (let file of files) {
      // 파일의 내용을 읽어서 화면에 출력하고자 한다..
      // 텍스트 파일과 이미지 파일을 읽고, 출력하는 코드가 상이해진다..
      // 유저가 선택한 파일의 타입에 따라 다른 코드가 실행되게..
      if (file.type.startsWith("text")) {
        handleTextFile(file); // 함수를 분리시킴 (1)
      } else if (file.type.startsWith("image")) {
        handleImageFile(file); // 함수를 분리시킴 (2)
      }
    }
  }
};

function handleTextFile(file) {
  let liNode = document.createElement("li");

  // 파일명 -> h3
  let nameNode = document.createElement("h3");
  nameNode.innerHTML = file.nameNode;
  liNode.appendChild(nameNode);

  // 유저가 선택한 파일을 읽기... file에서 fileReader를...
  const reader = new FileReader(); // file을 읽는 API 이용
  // readAsText(), readAsDataURL(), readAsArrayBuffer(), readAsBinaryString()등의 함수 제공..

  reader.onload = function (e) {
    // 파일을 다 읽은 순간
    let pNode = document.createElement("p");

    // 파일의 엔터(\n)도 데이터이다. html에서는 태그에 의해서만 UI효과...
    // \n을 위한 엔터효과를 그대로 유지하겠다 (=> <br>로..)
    // 문자열.split('구분자') => 전체 문자열을 구분자로 나누어 배열로 리턴..
    pNode.innerHTML = e.target.result.split("\n").join("<br/>");

    // <li>에 파일을 읽은 내용을 추가..
    liNode.appendChild(pNode);
    resultNode.appendChild(liNode);
  };

  reader.onerror = function (e) {
    // 읽다가 에러가 발생한 경우
    // 항상 IO(file, network)은 에러 가능성이 농후..

    let pNode = document.createElement("p");
    pNode.innerHTML = "파일 읽기에 실패했습니다.";
    liNode.appendChild(pNode);
    resultNode.appendChild(liNode);
  };
  reader.readAsText(file);
}

function handleImageFile(file) {
  let liNode = document.createElement("li");
  let nameNode = document.createElement("h3");
  nameNode.innerHTML = file.name;
  liNode.appendChild(nameNode);

  let reader = new FileReader();
  reader.onload = function (e) {
    let imgNode = document.createElement("img");
    imgNode.setAttribute("src", e.target.result);
    imgNode.setAttribute("width", "100");
    liNode.appendChild(imgNode);
    resultNode.appendChild(liNode);
  };
  reader.readAsDataURL(file); // base 64로 인코딩된 문자열을 읽어라.. // base64 문자열을 <img>태그로 출력이 가능함으로..
  // 물론 src에 file.name을 넣어도 되긴 하지만, 데이타적으로 가지고 있겠다는 깊은 뜻..
}

fileNode.addEventListener("change", handleFile);
