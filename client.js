var io = require('socket.io-client')
var socket = io.connect('http://localhost:8081', {reconnect: true});

socket.on('connect', function(){
    var roomid = "1234";
    socket.emit("login", roomid);
});

socket.on('loginSuccess', function(data){
    var data = {
        name:"test",
        score:"123"
    }
    console.log(data);
    socket.emit("tip-notification", data);
});
socket.on('disconnect', function(){
    console.log("disconnect")
});