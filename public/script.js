var send_btn = document.getElementById('send-button');
var msg_field = document.getElementById('msg-field');
var chat = document.getElementById('chat-panel');
var msg_send = '';
var msg_recieve = '';


const socket = io();

form.addEventListener('submit',function(e){
	e.preventDefault();
	msg_send = msg_field.value;
	if(msg_send){
		socket.emit('chat-send', msg_send);
		msg_field.value = '';
		var show_msg_send = document.createElement('LI');
		show_msg_send.setAttribute('class','list-send');
		show_msg_send.innerHTML = msg_send;
		chat.appendChild(show_msg_send);
		msg_send = '';
		window.scrollTo(0, document.body.scrollHeight);
		
	}
});

socket.on('chat-served', data=> {
		console.log(data);
		var show_msg_receive = document.createElement('LI');
		show_msg_receive.setAttribute('class','list-recieve');
		show_msg_receive.innerHTML = data;
		chat.appendChild(show_msg_receive);
		data = '';
		window.scrollTo(0, document.body.scrollHeight);
		});


