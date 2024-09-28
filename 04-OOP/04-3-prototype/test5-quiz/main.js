"use strict";

const School = function (kor, eng) {
  this.korean = kor;
  this.english = eng;
};

// 프로토타입 상에서 sum, avg 함수 만들기
School.prototype.calcSum = function () {
  return this.korean + this.english;
};

School.prototype.calcAverage = function () {
  return Math.round(this.calcSum() / 2);
};

let school1 = new School(100, 85);
console.log(school1);
console.log("school sum :", school1.calcSum());
console.log("school avg :", school1.calcAverage());

const HighSchool = function (kor, eng) {
  // 상위 함수의 프로토타입 내 정의한 함수를 apply method로 호출
  // 이미 Highschool.prototype = new School() 코드로 함수를
  // 나 (= this = highschool 에서의 객체)를 생성할 때 School에 있는 kor, eng를 정의하도록 만들기 위해(이때 프로토타입 내 함수들은 불러와지지 않는다!!) apply 메소드 사용
  School.apply(this, [kor, eng]);

  HighSchool.prototype.calcGrade = function () {
    const avg = this.calcAverage();

    if (avg >= 90) {
      return "A";
    } else if (avg >= 80 && avg < 90) {
      return "B";
    } else if (avg >= 70 && avg < 80) {
      return "C";
    } else if (avg >= 60 && avg < 70) {
      return "D";
    } else {
      return "F";
    }
  };
};

// kor, eng, sum(), avg()를 모두 School에서 상속받게 하기.
// 이렇게 새로운 객체를 불러와서 Prototype까지 다 지정할 순 있지만,,,
// ?
// 📌 객체 자체를 연결
// HighSchool.prototype = new School();
// 🌟 생성자함수의 프로토타입에 연결
HighSchool.prototype = School.prototype;

let high1 = new HighSchool(100, 85);
console.log(high1);
console.log("highschool sum :", high1.calcSum());
console.log("highschool avg :", high1.calcAverage());
console.log("highschool grade :", high1.calcGrade());

// 상위객체 자체 new School()를 Highschool.prototype과 연결시킨 것과 상위객체의 프로토타입만 (School.prototype()) 연결시킬 때 차이점 다시 한번만 설명해주실 수 있나요?

console.dir(high1);
// 📌 객체 자체를 연결
// this - kor, eng
// prototype - eng, kor, grade()
// prototype - prototype - avg(), sum()

// 🌟 생성자함수의 프로토타입에 연결
// this - kor, eng
// prototype - calcAverage, calcSum, calcGrade
// => apply 메소드로 가져온 kor, eng 멤버를 굳이 또 새로운 객체로 또 불러와서 그에 대한 prototype에 있는 함수를 가져와야 할 필요 없이, 그냥 프로토타입내 선언돼있는 함수만 쏙 가져오는게 메모리 효율성이 더 좋다!
