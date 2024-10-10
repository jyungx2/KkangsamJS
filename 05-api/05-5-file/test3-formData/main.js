"use strict";
// formData를 이용해 파일 업로드하는 테스트

let button = document.getElementById("button");
let fileNode = document.getElementById("filepicker");
let titleNode = document.getElementById("title");

// async를 선언해야 await을 쓸 수 있어서..
async function upload(e) {
  e.preventDefault();

  let title = titleNode.value;
  let files = fileNode.files;

  if (files.length !== 0) {
    // FormData API로 서버에 전송할 데이터를 구성..
    // * Formdata: 자바스크립트 API이며, 넘겨야 하는 데이터를 키-밸류 형식으로 표현하기 위해 제공되는 API이다.
    // File 이외에 일반 데이터도 Form Data에 추가 가능
    let formData = new FormData();
    for (let file of files) {
      formData.append("file", file); // 'file'추가된 데이터 식별자..
    }
    formData.append("title", title); // 파일은 여러개 첨부할 수 있는데, 그에 대한 제목은 하나니까 루프 밖에다 작성.

    // 파일 업로드는 무조건 post 방식으로!
    let resp = await axios.post("http://localhost:8000/upload", formData);

    if (resp.data.status === 200) {
      alert("upload OK");
    }
  }
}

button.addEventListener("click", upload);
