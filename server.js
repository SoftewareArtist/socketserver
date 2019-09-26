require('dotenv').config();
var express = require('express'),
    app = express(),
    users = [];
var moment = require("moment");

app.use('/', express.static(__dirname + '/www'));


var server = require('http').createServer(app);
server.listen(process.env.PORT || 3000);//publish to heroku
console.log("SERVER IS RUNNING ON", process.env.PORT || 3000)

io = require('socket.io').listen(server),
io.on('connection', (socket) => {
    console.log("NEW SCOKET IS CONNECTED ON", process.env.PORT || 3000)
    //new user login
    socket.on('login', (roomid) => {
        socket.roomid = roomid;
        console.log("ROOM", roomid);
        socket.join(roomid)
        socket.emit('loginSuccess');
    });

    //user leaves
    socket.on('disconnect', () => {
    });

    //new tip update
    socket.on('tip-notification', (data) => {
        var roomid = socket.roomid;
        console.log("room id", roomid);
        socket.broadcast.to(roomid).emit('tip-notification', data);
    });
});
