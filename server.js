
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT||5000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var chat_msg = '';

app.get('/', (req,res)=>{
	res.sendFile(path.join(__dirname,'public','index.html'));
});
app.get('/script.js', (req,res)=>{
	res.sendFile(path.join(__dirname,'public','script.js'));
})
app.get('/style.css', (req,res)=>{
	res.sendFile(path.join(__dirname,'public','style.css'));
})
io.on('connect_failed', function() {
   alert("Sorry, there seems to be an issue with the connection!");
});
io.on('connection', socket=>{
	console.log('A user connected ');
	socket.on('chat-send', msg=>{
		chat_msg = msg;
		socket.broadcast.emit('chat-served',chat_msg);
		console.log(chat_msg);
		chat_msg = '';
	});
	socket.on('disconnect', () => {
		console.log('A user disconnected ');
	});
});
server.listen(PORT);

