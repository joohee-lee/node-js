
// npm install ejs

// Express 서버 생성
var express = require('express');
var app = express();

//라우터 모듈인 main.js 를 불러와서 app 에 전달
var router = require('./router/main')(app);

// 서버가 읽을 수 있도록 HTML 의 위치를 정의
app.set('views', __dirname + '/views');

//서버가 HTML 렌더링을 할 때, EJS 엔진을 사용
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3031, function(){
    console.log('Express server has started on port 3031')
});

//정적 파일 (Static files)
//정적 파일이란? HTML 에서 사용되는 .js 파일, css 파일, image 파일
//express.static() 메소드를 사용
app.use(express.static('public'));
