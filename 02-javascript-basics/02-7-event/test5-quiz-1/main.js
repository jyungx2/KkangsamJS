"use strict";

let formNode = document.getElementById("form");
let resultNode = document.getElementById("result");

function printResult(message) {
  resultNode.innerHTML = message;
}

// '회원가입' 버튼을 클릭하면 입력한 데이터를 화면에 출력
formNode.addEventListener("submit", (e) => {
  let usernameNode = document.getElementById("username");
  let numberNode = document.getElementById("number");
  let jobNode = document.getElementById("job");

  e.preventDefault();

  //  ------------------ 강사님께 제출한 코드 ----------------------
  // 🖍️ <br>태그 사용 줄이기 위해 <p>태그 사용하는 게 더 나은 방법!!
  //   printResult(
  //     `- Name : ${usernameNode.value} <br> - Number : ${numberNode.value} <br> - Job : ${jobNode.value}`
  //   );
  // 🛎️ 출력 결과 (회원가입 버튼을 "최초로 클릭"했을 때만 출력.)
  //   name: 1;
  //   전화번호: 2;
  //   직업: 학생;

  //  ------------------ 의문점 No.1 시작 ----------------------
  // ❓ printResult() 함수를 3번 각각 따로따로 출력하고 싶으면??
  // 이렇게 하면 3줄이 잘 출력될 것 같지만, 💥가장 마지막 코드('직업: ~')만 출력된다.
  // 👉 innerHTML 프라퍼티의 특성 때문!
  //   printResult(`name : ${usernameNode.value}`);
  //   printResult(`전화번호 : ${numberNode.value}`);
  //   printResult(`직업 : ${jobNode.value}`);

  //  ∵ innerHTML 특성 때문.......
  // 🔸 innerHTML property = DOM Node의 Body부분을 ✨통째로✨ 업데이트하는 속성.
  // 따라서 resultNode안에 있는 내용물을 불러올 때마다 계속 리셋하는 개념이므로, 이전에 추가한 내용물이 다음 콜백함수에 의해 override 되어버려 결론적으로 마지막 코드만 출력되는 것!!
  // => 이에 대한 해결책으로,
  // 1) html에서 준비가 안된 태그를 동적으로 만들어내는 프라퍼티인 createElement()를 사용할 수 있음.
  // 2) 또는, insertAdjacentHTML('afterbegin', html code)을 이용해 계속해서 추가 가능!
  // 💥 하지만 이건 요소를 하나 둘 셋.. 계속해서 ✨추가하고✨ 싶을 때만 쓸 수 있고, 지금 예제와 같이 딱 한번만 출력하고 말 때는 그냥 innerHTML을 사용하는 게 낫다.

  // ✅ Chapter 1: 💫CreateElement(), CreateTextNode(), appendChild()의 동작원리 파악하자.💫
  // 💡 div 태그를 createElement()를 이용해 만들 수 있다. 이때 "" 꼭 포함하기!!
  let divNode1 = document.createElement("div");

  // 💡 createTextNode()를 이용해 디브 안에 넣을 문자열('순수 텍스트' = ~TextNode)을 준비한다.
  let nameTextNode1 = document.createTextNode(`이름 : ${usernameNode.value}`);
  let numberTextNode1 = document.createTextNode(
    `전화번호 : ${numberNode.value}`
  );
  let jobTextNode1 = document.createTextNode(`직업 : ${jobNode.value}`);

  // 💡 appendChild() 함수를 이용해 각각의 텍스트 노드들을 JS코드 상에서 동적으로 만든 divNode1 안에 넣는다.
  divNode1.appendChild(nameTextNode1);
  divNode1.appendChild(numberTextNode1);
  divNode1.appendChild(jobTextNode1);

  // 💥 이때, createTextNode는 innerHTML과 다르게 html 태그들을 parsing하지 못하고(인식X), '순수한 텍스트'를 만드는 속성으로, <br/>, <p>태그를 인식하지 못해서 줄바꿈이 적용이 안 된다!!

  // ✍🏼 createTextNode()와 innerHTML 속성의 정의 참고
  // 🔺 createTextNode(): 순수한 텍스트 노드를 생성하므로 HTML 태그를 포함하더라도 텍스트로 취급하여 화면에 출력한다. => 줄바꿈 사용하고 싶다면, createElement('br')또는 createElement('p')를 이용해 요소를 따로 만들어 준 다음에, 이를 추가하거나, 이 안에 textnode를 집어넣던가 해야한다.

  // 🔺 (DOMNode).innerHTML: HTML 문자열을 parsing하고 해석하여, 요소의 내부 HTML을 설정한다. 즉, HTML 태그가 포함된 문자열을 처리하여 브라우저가 적절히 렌더링된다.

  // 💡 문자열을 미리 준비한 디브(divNode) 안에 집어넣음!
  resultNode.appendChild(divNode1);

  // 🛎️ 이런 식으로 텍스트 노드들이 div안으로 묶이면서 '각각의 디브'가 한 줄을 차지하면서 생성될 것!
  // => 여기선 아직, <p>요소나 <br>요소를 따로 만들어서 추가하지 않았기 때문에 디브 내 textnode들이 줄바꿈 ❌
  // 이름 : 1 전화번호 : 2 직업 : 학생
  // 이름 : 1 전화번호 : 2 직업 : 학생
  // 이름 : 1 전화번호 : 2 직업 : 학생

  // ✅ Chapter 1

  //  -------------------- 의문점 No.2 ----------------------
  // ❓ 위와 같이 div마다 한 줄을 차지하지 않고, 맨 위에 강사님께 제출한 코드처럼, 디브 내에서도 각각의 텍스트 노드마다 줄바꿈시키고 싶다면 ??

  // ✅ Chapter 2: 디브 내 순수 텍스트 노드들을 줄바꿈하는 방법 1 ✍🏼

  /*
  // 💡 div태그 준비.
  let divNode2 = document.createElement("div");

  // 💡 <br>을 쓰지 않고 줄바꿈하기 위해 <p> 요소를 만들어 divNode에 넣은 후, 이 divNode자체를 resultNode에 넣어 출력하자!
  // 1) 그렇다면 일단, p 요소를 createElement로 만들어야겠지!?
  // <p> 요소니까, paragraph로 네이밍하자.
  let nameParagraph = document.createElement("p");
  let numberParagraph = document.createElement("p");
  let jobParagraph = document.createElement("p");

  // 2) 디브 안에 넣을 문자열('순수 텍스트')을 준비한다.
  // <p> 태그 안에 넣을 바디(텍스트)를 준비하자 => text node임으로 textnode이라 네이밍하자.
  let nameTextNode2 = document.createTextNode(`이름 : ${usernameNode.value} `);
  let numberTextNode2 = document.createTextNode(
    `전화번호 : ${numberNode.value} `
  );
  let jobTextNode2 = document.createTextNode(`직업 : ${jobNode.value} `);

  // 3) createTextNode()로 만든 텍스트 노드를 createElement()로 동적으로 만든 <p>에 하나씩 넣는다.
  // <p> : ~Paragraph  |  ~TextNode : 순수 텍스트 바디 (innerHTML)
  nameParagraph.appendChild(nameTextNode2);
  numberParagraph.appendChild(numberTextNode2);
  jobParagraph.appendChild(jobTextNode2);

  // 4)  한번에 resultNode상에 출력될 수 있도록 맨 위에 만든 'divNode2'에 완성한 <p> 요소들을 하나씩 집어넣는다.
  divNode2.appendChild(nameParagraph);
  divNode2.appendChild(numberParagraph);
  divNode2.appendChild(jobParagraph);

  // 5) 마지막으로, 실제 html상에 존재하는 div 노드인 resultNode상에 <p> 모음집인 divNode2를 넣어 페이지 상에 표시한다.
  resultNode.appendChild(divNode2);

  // 🛎️ 이런 식으로 각각에 대한 텍스트노드(이름, 전번, 직업)가 <p>로 묶이면서 디브 자체에서도 줄바꿈이 일어나게 될 것!
  // 이름 : 1
  // 전화번호 : 2
  // 직업 : 학생
  // 이름 : 1
  // 전화번호 : 2
  // 직업 : 학생
*/
  // ✅ Chapter 2

  // ✅ Chapter 3: 디브 내 순수 텍스트 노드들을 줄바꿈하는 방법 2✍🏼
  // : 이번에는 <p> 요소 3개를 따로 만들지 않고, 그냥 순수 Textnode만 만든 후, divNode에 넣되,
  // </br>요소를 createElement('br')로 만든 <br> 요소를 각각의 textnode 넣어준 다음에 바로바로 넣어주어 줄바꿈시킨다.

  // 💡 div태그 준비.

  let divNode3 = document.createElement("div");

  const name = document.getElementById("username").value;
  const phoneNumber = document.getElementById("number").value;
  const job = document.getElementById("job").value;

  // 💡 디브 안에 넣을 문자열('순수 텍스트')을 준비한다.
  let nameTextNode3 = document.createTextNode(`이름 : ${name} `);
  let numberTextNode3 = document.createTextNode(`전화번호 : ${phoneNumber} `);
  let jobTextNode3 = document.createTextNode(`직업 : ${job} `);

  //  -------------------- 의문점 No.3 ----------------------
  //  ❓ 이렇게 먼저 선언해주고 breakLine을 갖다쓰면 왜 적용이 안 됨??
  let breakLine = document.createElement("br");
  //  ❌ 아래와 같이 줄바꿈이 적용 ❌
  // 이름 : 1 전화번호 : 2 직업 : 학생
  // 이름 : 1 전화번호 : 2 직업 : 학생
  // 이름 : 1 전화번호 : 2 직업 : 학생

  //  이름 출력 + 줄바꿈
  divNode3.appendChild(nameTextNode3);
  divNode3.appendChild(document.createElement("br")); // 줄바꿈 적용 ⭕️
  //   divNode3.appendChild(breakLine); // 줄바꿈 적용 ❌

  //  번호 출력 + 줄바꿈
  divNode3.appendChild(numberTextNode3);
  divNode3.appendChild(document.createElement("br")); // 줄바꿈 적용 ⭕️
  //   divNode3.appendChild(breakLine); // 줄바꿈 적용 ❌

  //  직업 출력 + 줄바꿈
  divNode3.appendChild(jobTextNode3);
  divNode3.appendChild(document.createElement("br")); // 줄바꿈 적용 ⭕️
  //   divNode3.appendChild(breakLine); // 줄바꿈 적용 ❌

  // 내가 만든 디브를 찐디브(상위 디브) 안에 넣을 차례!
  resultNode.appendChild(divNode3);
  // ✅ Chapter 3
});
