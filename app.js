//  express study --- 1 
// *** 모듈 추출  *** //

//file system
var fs = require('fs');

var bodyParser = require('body-parser');
//body-parser 모듈이 express와는 따로 설치해줘야함. cmd에서 "npm installs body-parser"
//body-parser은 POST요청 데이터를 추출하는 미들웨어임. 이걸 사용하면 request객체에 body 속성이 부여됨.

var express = require('express');
//서버 생성 , express 객체를 설정한 후에, express 애플리케이션에 대한 환경을 설정
var app = express();

//CORS란 Cross Origin Resource Sharing의 약자로, 현재 도메인과 다른 도메인으로 리소스가 요청될 경우를 말한다. 예를 들어, 도메인 http://A.com 에서 읽어온 HTML페이지에서 다른 도메인 http://B.com/image.jpg를 요청하는 경우를 말한다. 이런 경우에 해당 리소스는 cross-origin HTTP 요청에 의해 요청된다. 보안 상의 이유로, 브라우저는 CORS를 제한하고 있다.
var cors = require('cors');

// dust
var dust = require('dustjs-linkedin');
dust.helper = require('dustjs-helpers');
dust.config.whitespace = true; // 줄바꿈 유지
dust.config.cache = false; // true : 실행할때마다 dust 다시 로딩, false : 다시 로딩 없음
//Disable Caching- As of Dust 2.7.0, you can set dust.config.cache to false to disable the cache in development, so Dust will try to reload the template every time.

var DEBUG = true;
var PORT_NUM = 3002;
var SANDBOX_PATH = './view/sandbox';
var OUTPUTJS_PATH = './view/sandbox/pub/front/output.js';
var TARGET_FOLDER_PATH = '';

var cc = {
    log: function( arg1, arg2 ) {
        if ( DEBUG === false ) {
            return false;
        }

        console.log( arg1, arg2 );
    },
    findPartial: function(__path) {
        cc.log('cc.findPartial(__path) : ', __path );

        fs.readdir( __path, function( err, files ) {
            files.forEach( function(file) {
                var fullpath = __path.concat(file);

                // 맥으로 작업할 때 예외파일
                if ( file === '.DS_Store' ) {
                    return false;
                }

                // 하위 폴더로 이동
                // if ( fs.statSync(fullpath).isDirectory() ) {}
                if ( file.indexOf('.') === -1 ) {
                    cc.findPartial( fullpath.concat('/') );
                    return false;
                }

                // 파셜 대상(.dust)이 아닐 경우 예외처리
                if ( file.indexOf('.dust') === -1 ) {
                    return false;
                }


                cc.compile(fullpath, file);
            });
        });
    },
    compile: function(__path, file) {
        var str = fs.readFileSync( __path, 'utf-8' );
        var dustId = file.split('.')[0];

        dust.loadSource(
            dust.compile(
                str,
                dustId
            )
        );

        // cc.log( 'partial : ', dustId );
    },
    getJsonPath: function(path) {
        var ext;

        if ( path.indexOf('.html') > -1 ) {
            ext = '.html';
        } else {
            ext = '.dust';
        }

        cc.log( 'EXT : ', ext );
        return SANDBOX_PATH.concat( path.replace(ext, '.json') );
    }
};


process.argv.forEach(function(val, index) {
    // console.log(`${index}: ${val}`);

    if ( index === 2 ) {
        // TARGET_FOLDER_PATH = val;
        SANDBOX_PATH = SANDBOX_PATH.concat(val);
    }
});



var corsOptions = {
    origin: '*',
    method: ['GET', 'POST'],
    allowedHeaders: '*'
};


// all environments
//
//CoRS 설정
app.use(cors());

//node.js의 포트를 설정한다. 여기서는 default를 PORT_NUM ( 3002) 포트로 사용 하고, 환경변수에 PORT라는 이름으로 포트명을 지정했을 경우에는 그 포트명을 사용하도록 한다.(Linux의 경우 export PORT=80 이런식으로 환경 변수를 지정한다.)
app.set('port', (process.env.PORT || PORT_NUM));

// 미들웨어를 설정
app.use(bodyParser.urlencoded({extended: true}));
// extended:true를 해줘야 한다 .왜냐하면 url인코딩이 계속 적용될지 1번만 적용할지 묻는 것이기 때문

// 정적파일 셋팅
app.use(express.static(__dirname));

app.use(function (req, res, next) {
    //http/https 에서 browser 가 caching 하지 않게 하는 http header
    res.setHeader('Cache-Control', 'no-cache');
    next();
});



app.get('/*', function (req, res) {

    var renderPathHTML;
    var renderPathJson;
    var html;
    var json;
    var template;

    // dust.loadSource( fs.readFileSync( OUTPUTJS_PATH, 'utf-8' ) );

    if ( req.path === '/favicon.ico' ) {
        return false;
    }

    console.log( '.html : ', req.path.indexOf('.html') );
    console.log( '.dust : ', req.path.indexOf('.dust') );

    // if ( req.path.indexOf('.html') === -1 && req.path.indexOf('.dust') === -1 ) {
    //     return false;
    // }

    cc.log( '', '' );
    renderPathHTML = SANDBOX_PATH.concat(req.path);
    renderPathJson = cc.getJsonPath(req.path);

    cc.log('HTML : ', renderPathHTML);
    cc.log('JSON : ', renderPathJson);

    // html, dust 파일 파일 로드, 예외처리
    try {
        fs.accessSync( renderPathHTML, fs.F_OK );
        html = fs.readFileSync( renderPathHTML, 'utf-8' );
    } catch(e) {
        html = '';
    }

    cc.log('req.query : ', req.query);

    if ( req.query.jsontype ) {
        renderPathJson = renderPathJson.concat('$').concat(req.query.jsontype);
        cc.log('renderPathJson', renderPathJson);
    }

    // JSON 파일 로드, 예외처리
    try {
        fs.accessSync( renderPathJson, fs.F_OK);
        json = fs.readFileSync( renderPathJson, 'utf-8' );
    } catch(e) {
        json = '{}';
    }

    template = dust.loadSource( dust.compile(html) );
    json = JSON.parse(json);
    json.staticHost = '';
    // cc.log('template', template);

    if ( req.query.device ) {

        json.userAgentInfo = {
            "device": {
                "type": "PC"
            },
            "os": {
                "name": ""
            },
            "browser": {
                "name": ""
            },
            "app": false,
            "mobile": false,
            "tablet": false,
            "pc": false,
            "mobileDevice": false,
            "wideScreen": false
        };

        json.userAgentInfo.device.type = req.query.device;

        switch(req.query.device) {
            case 'MOBILE':
                json.userAgentInfo.mobile = true;
                json.userAgentInfo.mobileDevice = true;
                break;
            case 'TABLET':
                json.userAgentInfo.tablet = true;
                json.userAgentInfo.mobileDevice = true;
                json.userAgentInfo.wideScreen = true;
                break;
            case 'PC':
                json.userAgentInfo.pc = true;
                json.userAgentInfo.wideScreen = true;
                break;
            default:
                json.userAgentInfo.pc = true;
                json.userAgentInfo.wideScreen = true;
                break;
        }

        if ( req.query.os ) {
            json.userAgentInfo.os.name = req.query.os;
        }
        if ( req.query.browser ) {
            json.userAgentInfo.browser.name = req.query.browser;
        }
        if ( req.query.app ) {
            json.userAgentInfo.app = true;
        }
    }

    cc.log('userAgentInfo : ', json.userAgentInfo );

    dust.render(template, json, function(err, out) {
        if ( err ) {
            console.log( 'Rendering Failed!\n' + err );
            return false;
        }

        // console.log('out', out);

        res.write(out);
        res.end();
    });
});

app.listen( app.get('port'), function () {
    console.log('Server started (port: %s)', app.get('port') );
    cc.findPartial(SANDBOX_PATH.concat('/'));
});
