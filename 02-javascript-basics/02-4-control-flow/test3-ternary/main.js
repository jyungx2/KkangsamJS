"use script";

let data = 9;

let result;

if (data % 4 === 0) {
  result = "4의 배수입니다.";
} else {
  result = "5의 배수입니다.";
}
console.log(result);

let result2 = data % 4 ? "4의 배수입니다." : "5의 배수입니다.";
console.log(result2);
