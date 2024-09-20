"use strict";

// form 제출시 디폴트로 실행되는 새로고침 방지
let formNode = document.querySelector(".form-register");

// form 요소의 기본 동작은 제출 시 페이지가 새로고침 되는 것.
// form 요소는 전송 기능을 기본적으로 수행하여 type="submit"을 굳이 명시 해주지
// 않아도,
formNode.addEventListener("submit", (e) => {
  e.preventDefault();
  submitRegister(); // 이 함수는 button 태그 안에 직접 달아줬다. (main-improved 연결을 위해 삭제한 상태)
});

// 결과 출력 노드
const resultRegister = document.querySelector(".resultRegister");

// 이름 노드
const inputUsername = document.querySelector("#username");

// 취미노드 (checkbox => 복수노드 -> input's')
// checkbox, radiobox, select와 같은 폼 요소의 하위 요소들은
// 단순히 태그명, 클래스명, 아이디명으로 노드 선택 불가!!
// id는 같은 영역으로 묶기 위해 동일하게 잡아줘야 하고 태그 또한 당연히 동일하기 때문
// => 따라서, name 이라는 속성(Attribute)를 다르게 지정하여 이를 value에 대한
// key로 설정한 후, 이를 이용해 노드를 선택한다.
// => getElementsByName() 함수 이용해 복수 노드 선택할 수 밖에 없는 것.

// => 하지만, 이렇게 Name을 이용해서 한꺼번에 복수형으로 노드리스트를 가져오는 것보다,
// 가상셀렉터(:checked)를 이용해 아예 체크된 노드들만 가져오도록 코딩하는 것이 더 효율적.
// 왜냐면 내가 코딩했던 것처럼 For-loop를 만들고 또 그 안에 If-else절을 굳이 써줄 필요가 없기 때문!
//

// 🖍️ 강사님:
// hobbyNode =document.querySelectorAll('input[id="hobby"]:checked')
// genderNode = document.querySelector('input[name="gender"]:checked')

// old way: getElementsByName.. => 이 예제에선 좋은 셀렉 방법 X
const inputsHobby = document.getElementsByName("hobby");

// ✨ new advanced way => querySelector로 css상에서 쓰인 클래스 네임 그대로 사용하자
const inputsHobbycopy = document.querySelectorAll(
  "input[name='hobby']:chekced"
);
// 💥getElementByName()이라는 함수는 존재 ❌
// 오로지 항상 복수형의 요소들(Nodelist)만 가져오기 떄문에 무조건 's'를 붙여줘야 함.
const outputsHobby = [];
// 출력할 value들만 루프로 모아서 배열에 push하기 위함

// 성별노드 (radiobox => 복수노드 -> input's')
// old way: getElementsByName.. => 이 예제에선 좋은 셀렉 방법 X
const inputsGender = document.getElementsByName("gender");
let outputGender = "";

// 💥 파라미터를 message로 지정해주고, 그냥 message로 출력되게끔..
// => 재사용성 위해서 만들었는데, 이렇게 세분화해서 써주면 무슨 소용...??!
function displayResult() {
  resultRegister.innerHTML = `<p>이름: ${
    inputUsername.value
  }</p> <p>취미: ${outputsHobby.join(", ")}</p> <p>성별: ${outputGender}</p>`;
}

function submitRegister() {
  // 📌 선택된 checkbox를 출력하기 위한 루프
  // 복수노드 선언 후, "속성" 중 checked가 있냐 없냐에 따라 출력여부가 달라진다.

  for (let i = 0; i < inputsHobby.length; i++) {
    // 💥checked: 속성 그 자체이기 때문에, classList가 아닌, 바로 .찍어서 checked로 판단
    if (inputsHobby[i].checked) {
      outputsHobby.push(inputsHobby[i].value); // .value 필수 입력!!
    }
  }

  // 📌 선택된 radiobox를 출력하기 위한 루프
  for (let i = 0; i < inputsGender.length; i++) {
    if (inputsGender[i].checked) {
      outputGender = inputsGender[i].value;
    }
  }

  displayResult(); // 💥
}

// ❓ checked된 인풋 노드를 출력하는 방법에 있어서 보여주신 방법처럼 css 셀렉터를 사용하지 않고, 실습시간 때 보여주신 것처럼 일단 복수형으로 노드를 다 가져온 다음에, 그냥 for loop 안에서 if절의 조건으로 checked 속성이 있는지 판별하고나서 출력하는 방법도 있는 것 같은데, 두 방식 중에 어떤 방식이 실무적으로 더 선호되는지나 유지보수성이 좋은지 궁금합니다.
