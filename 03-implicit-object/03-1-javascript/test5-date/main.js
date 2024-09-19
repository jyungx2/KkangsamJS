"use strict";

// 현재 시간/날짜 획득...
let date1 = new Date();
// 모든 객체는 new(객체 생성/선언 연산자)로 생성해야 한다.
console.log(date1);
// Thu Sep 19 2024 10:11:50 GMT+0900 (Korean Standard Time)
console.log(date1.toLocaleString()); // 9/19/2024, 10:12:07 AM

// 특정 시간을 지정해서 객체 생성...
let date2 = new Date("2024-09-19 10:14:10"); // Full 문자열로 지정
console.log(date2.toLocaleString());

// 🚨 월을 표현하는 데이터는 0부터 카운트되어 9월 = 8로 입력해야 한다.
let date3 = new Date(2024, 8, 19, 10, 10, 10);
console.log(date3.toLocaleString()); // 9/19/2024, 10:10:10 AM

// 특정 데이터만 추출.. get함수 쓰자!!!
console.log("year", date1.getFullYear()); // year 2024
console.log("month", date1.getMonth()); // month 8
console.log("date", date1.getDate()); // date 19

console.log("day", date1.getDay()); // day 4 (0부터 sunday -> Thursday)
console.log("seconds", date1.getSeconds()); // seconds 12
console.log("timestamp", date1.getTime()); // timestamp 1726708843505

// date 비교...
// 이벤트 시간 가정..
let eventStartDate = new Date("2024-09-01T00:00:00");
let eventEndDate = new Date("2024-09-30T23:59:59");
console.log(eventStartDate, eventEndDate);
// Sun Sep 01 2024 00:00:00 GMT+0900 (Korean Standard Time) Mon Sep 30 2024 23:59:59 GMT+0900 (Korean Standard Time)

// 예약시간...
let regDate = new Date("2024-09-19T14:00:00");
console.log(regDate.toLocaleDateString()); // 9/19/2024
console.log(regDate.toLocaleTimeString()); // 2:00:00 PM
console.log(regDate.toLocaleString()); // 9/19/2024, 2:00:00 PM

// 비교...
if (regDate.getTime() < eventStartDate.getTime()) {
  console.log(`예약하신 시간은 이벤트 시작 전입니다.`);
} else if (regDate.getTime() > eventStartDate.getTime()) {
  console.log(`예약하신 시간은 이벤트 종료 후 입니다.`);
} else {
  console.log(`${regDate.toLocaleDateString()}로 예약이 완료됐습니다.`);
}
