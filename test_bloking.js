// callback 개념.
// Blocking Code :  Callback 함수가 사용되지 않는, Blocking Code 예제

// 1. 필요한 모듈 import 하기
var fs = require("fs");
var data = fs.readFileSync("input.txt");

console.log(data.toString());
console.log("program has ended");


// 2. 서버 생성

