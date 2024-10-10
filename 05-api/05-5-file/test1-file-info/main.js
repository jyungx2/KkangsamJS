"use strict";

let fileNode1 = document.getElementById("fileInput1");
let fileNode2 = document.getElementById("fileInput2");
let resultNode = document.getElementById("results");

function handleFile(e) {
  // 기존 화면 출력 결과 지우고,, 다시 출력하기 위해..
  while (resultNode.firstChild) {
    resultNode.removeChild(resultNode.firstChild);
  }
  // 유저가 선택한 파일 정보 획득
  // 사용자가 파일 하나 선택하든 여러개 선택하든 모든 파일은 file객체로 만들어지며, File객체들이 FileList에 담겨서 전달된다.

  let files = e.target.files; // 여러 파일 선택이 가능함으로..

  // files의 객체 갯수만큼 반복적으로 for loop 실행
  // for loop가 한번씩 실행되면서 Files안의 객체가 File에 대입...
  if (files.length !== 0) {
    for (let file of files) {
      let item = document.createElement("li");
      item.innerHTML = `file name : ${file.name}, file size : ${
        file.size
      }, modified : ${new Date(file.lastModified).toDateString()}`;
      //File 객체의 Name, size, lastmodified 프라퍼티로 파일의 이름, 사이즈, 저장시간을 획득하여 화면에 출릭시킬 수 있다.
      resultNode.appendChild(item);
      // 출력한 이미지를 클릭하여 computed상에서 보면 다음과 같이 64베이스로 저장된 것을 확인할 수 있다.
      // current source : data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…k7uJ3LXCwNtbODnPvQ86FqkNtarhDiLuzAk8mshG2c8mz/9k=
    }
  }
}

fileNode1.addEventListener("change", handleFile);
fileNode2.addEventListener("change", handleFile);
