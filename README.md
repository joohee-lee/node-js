# node-js

## node-js ?
- Node.js®는 Chrome V8 JavaScript 엔진으로 빌드된 JavaScript 런타임입니다. 
- Node.js는 이벤트 기반, 논 블로킹 I/O 모델을 사용해 가볍고 효율적입니다. 
- Node.js의 패키지 생태계인 npm은 세계에서 가장 큰 오픈 소스 라이브러리이기도 합니다.
(출처: https://nodejs.org/ko/)

##  오해
- Node는 웹서버가 아님
- Node 자체로는 아무것도 하지 않고 아파치 웹서버처럼 HTML 파일 경로를 지정해주고 서버를 열고 그런 설정이 없다고함.
- 단, HTTP 서버를 직접 작성 (일부 라이브러리의 도움을 받으면서). 
- Node.js 는 그저 코드를 실행할 수 있는 하나의 방법에 불과한 그저 JavasScript 런타임

## use  

- 입출력이 잦은 어플리케이션
- 데이터 스트리밍 어플리케이션
- 데이터를 실시간으로 다루는 어플리케이션
- JSON API 기반 어플리케이션
- 싱글페이지 어플리케이션

# Node.js Application 만들기

## 1단계: 필요한 모듈 import 하기

어플리케이션에 필요한 모듈을 불러올땐 require 명령을 사용
다음 코드는 HTTP 모듈을 불러오고 반환되는 HTTP 인스턴스를 http 변수에 저장

var http = require("http");

## 2단계: 서버 생성하기

1단계에서 만들은 http 인스턴스를 사용하여 http.createServer() 메소드를 실행합니다. 
그리고 listen 메소드를 사용하여 포트 8081과 bind 함. 

http.createServer() 의 매개변수로는 request 와 response 를 매개변수로 가지고 있는 함수를 넣어줍니다. 

## Hello World 리턴하는 포트3002 웹서버 생성 

~~~
    // 1. 필요한 모듈 import 하기
    var http = require("http");

    // 2. 서버 생성

    http.creatServer(function(request, response){
            /*
                HTTP 헤더 전송
                HTTP  status: 200 :  ok
                Content-Type: text/plain
            */
            response.writeHead(200, {'Content-Type':'text/plain'});

            /* Response Body 를 Hellow World 설정 */
            response.end("Hellow World\n");

    }).listen(3002);

    console.log("Server running at http://127.0.0.1:3002");
~~~

# REPL 터미널 
- REPL 은 Read Eval Print Loop의 약자
- Read – 유저의 값을 입력 받아 JavaScript 데이터 구조로 메모리에 저장합니다.
- Eval – 데이터를 처리(Evaluate) 합니다.
- Print – 결과값을 출력합니다.
- Loop – Read, Eval, Print 를 유저가 Ctrl+C를 두번 눌러 종료할때까지 반복합니다.
(Node.js 의 REPL 환경은 자바스크립트 코드를 테스팅 및 디버깅할때 유용)


# REPL 커맨드
- Ctrl+C – 현재 명령어를 종료합니다.
- Ctrl+C (2번)  – Node REPL 을 종료합니다.
- Ctrl+D – Node REPL을 종료합니다.
- 위/아래 키 – 명령어 히스토리를 탐색하고 이전 명령어를 수정합니다.
- Tab – 현재 입력란에 쓴 값으로 시작하는 명령어 / 변수 목록을 확인합니다.
- .help – 모든 커맨드 목록을 확인합니다.
- .break – 멀티 라인 표현식 입력 도중 입력을 종료합니다.
- .clear – .break 와 같습니다.
- .save filename – 현재 Node REPL 세션을 파일로 저장합니다.
- .load filename – Node REPL 세션을 파일에서 불러옵니다.

### Ref. https://velopert.com
