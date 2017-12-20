// callback 개념.
// Callback 함수가 사용된 Non-Blocking Code

// 1. 필요한 모듈 import 하기
var fs = require("fs");

// text
//fs.readFile() 함수는 비동기식으로 파일을 읽는 함수
//중에 에러가 발생하면 err 객체에 에러 내용을 담고 그렇지 않을 시에는 파일 내용을 다 읽고 출력
fs.readFile('input.txt' , function(err, data){
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("program has ended")

/*
callback 함수를 사용하여 이렇게 프로그램의 흐름을 끊지 않음으로서,
Non-Blocking 코드를 사용하는 서버는 Blocking 코드를 사용하는 서버보다
더 많은 양의 요청을 빠르게 처리 할 수 있게됩니다.

 */
