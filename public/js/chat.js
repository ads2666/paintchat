window.onload = function() {

	var messages = [];
	var socket = io.connect('http://localhost:8080');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var chatarea = document.getElementById("chatarea");
	var name = document.getElementById("name");

	socket.on('message', function (data) {
		if(data.message) {
			messages.push(data);
			var html = '';
			for(var i=0; i<messages.length; i++) {
				html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
				html += messages[i].message + '<br />';
			}
			chatarea.innerHTML = html;
			chatarea.scrollTop = chatarea.scrollHeight;
		} else {
			console.log("There is a problem:", data);
		}
	});

	sendButton.onclick = sendMessage = function() {
		if(name.value == "") {
			alert("Please type your name!");
		} else {
			var text = field.value;
			socket.emit('send', { message: text, username: name.value });
			field.value = "";
		}
	};

}
$(document).ready(function() {
	$("#field").keyup(function(e) {
		if(e.keyCode == 13) {
			sendMessage();
		}
	});
});
