let http = require('http');

let express = require('express');

let bodyParser = require('body-parser');

app = express();

let inputData = { data1 : 'node to tomcat testdata1', data2 : 'node to tomcat testdata2'};
// 전달하고자 하는 데이터 생성

let opts = {
    host: '127.0.0.1',
    port: 8080,
    method: 'POST',
    path: '/start',
    headers: {'Content-type': 'application/json'},
    body: inputData
};


// 포트 81 에서는 톰캣 서버가 대기하고 있다.
// 스프링 컨트롤러에서 '/start' URI 에 매핑하는 메소드를 두었다.
// 전달 방식은 json 형태로 하였다.
let resData = '';
let req = http.request(opts, function(res) {

    res.on('end', function() {
        console.log(resData);
    });
});

opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
req.data = opts ;
opts.headers['Content-Length'] = req.data.length;

req.on('error', function(err) {
    console.log("에러 발생 : " + err.message);
});


app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use(function (req,res,next) {
    //console.log("ㅊㅊㅊㅊ");

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>sssss</h1>');
    console.log(req.body);

});

// 요청 전송
req.write(JSON.stringify(req.data.body));

req.end();

http.createServer(app).listen(1516, function(){
    console.log('Server is running...');
});