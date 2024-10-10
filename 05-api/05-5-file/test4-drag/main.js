"use strict";

async function upload(files) {
  if (files) {
    let formData = new FormData();
    for (let file of files) {
      formData.append("file", file);
    }

    let resp = await axios.post("http://localhost:8000/upload", formData);
    if (resp.data.status === 200) {
      alert("upload ok");
    }
  }
}

// 📌 dropHandler: 사용자가 드래그한 요소를 드롭할 때 발생하는 이벤트 (=> 드롭된 데이터를 처리)
function dropHandler(e) {
  // 브라우저의 기본 이벤트 처리 금지..
  e.preventDefault();

  // drop한 파일 정보를 추출해서 Upload함수 호출..
  upload(e.dataTransfer.files);
}

// 📌 dragOverHandler: 사용자가 드래그한 요소가 드롭 가능한 영역 위에 있을 때 발생하는 이벤트 (=> 드롭 가능하도록 설정)
// 드롭 가능 구역에서 이 이벤트를 처리하지 않으면 기본적으로 드롭이 허용되지 않습니다.

function dragOverHandler(e) {
  // 브라우저의 기본 이벤트 처리 금지..
  e.preventDefault();
}
