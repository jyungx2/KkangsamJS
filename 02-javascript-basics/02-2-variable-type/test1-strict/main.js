"use strict"; // 일반적으로 함수만이 아닌, 전체 JS코드에 엄격모드 지정!
let data1 = 10;
data2 = 20;

console.log(data1, data2);

function myFun() {
  "use strict"; // data4 is not defined (🚨 error)
  let data3 = 10;
  data4 = 20;
  console.log(data3, data4);
}

myFun();

// 변수(variable): 메모리에 저장해놓은 데이터를 구분하는 식별자
// 변수를 선언하기 위해서는 var, let, const ✨예약어✨ 중 하나를 이용한다.
// * 선언하기만 해도 되고, 선언함과 동시에 값을 지정해줘도 OK. *
// var: ECMA5 때부터 쓰던, 자바스크립트 초기부터 제공되던 오래된 방법
// let: ECMA6(2015)에서 제공하는 변수 선언 방법
// const(상수): 상수로 선언할 시, 가급적 all 대문자로 쓴다. 코드의 명료성과 가독성을 높이기 위해 상수를 선언한다. (그냥 숫자로 쓸 수 있지만, 명료성 📈)
