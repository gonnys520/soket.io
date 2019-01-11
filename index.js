var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//connection은 이벤트 이름이다.
io.on('connection', function(socket){
    console.log('a user connected');

//io는 전역. 외부에서 전체적 총괄을 담당
//socket은 각각의 개인. 현재 연결된 사람들을 의미.
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    
    //서버사이드에서 메세지 수신
    socket.on("USERMSG", (data) => {
        console.log(data);
        //내가 받은 데이터를 모두에게 보낸다
        // io.emit("SERVERMSG", data);
        // 해당 유저 한명에게만
        users['user'].emit("SERVERMSG", data);
    })

    //귓속말 기능 구현
    socket.on("SETNICKNAME", (nickname) => {
        users[nickname] = socket;
        console.log(users)
    })

    
});




//3000은 port번호
http.listen(8080, function(){
    console.log('listening on *:8080');
});