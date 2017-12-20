
//1. Express 서버 생성
var express = require('express');
var app = express();

var server = app.listen(3031, function(){
    console.log("Express serer has started on port 3031");
});

/*
$ node server.js
3000으로 웹서버를 열고, 페이지에 들어가면 Cannot GET / 이라는 텍스트 노출.
왜냐구요? Router를 아직 정의하지 않았으니까요
*/


//2.Router 로 Request 처리하기
app.get('/', function(req, res){
    res.send('Hello world');
});

/*
server.js 를 재실행하시면,
http://localhost:3000/ 으로 접속하였을 때, Hello World 를 반환

 */
