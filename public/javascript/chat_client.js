
//Color palette for chat names
let colors = [
	"#660099",
	"#ffcc00",
	"#ff9900",
	"#ff6600",
	"#ff3300",
	"#ff0000",
	"#4eee94",
	"#0000ff",
	"#065535",
	"#003366",
	"#008000",
	"#a6008e",
	"#2f444b",
	"#68c7d4",
	"#fe6b73"
]

//Wait till document is ready
$(document).ready(async () => {

	const username = prompt('What is your name?')
	//Query the DOM
	const messageInput = $("#message-input")
	const messagesDiv = $("#chat-messages")

	//Make connection
	let socket = io.connect("http://localhost:3000")

	//Immediately emit connect signal with username data
	socket.emit("user_join", { user: name })


	//Generate random chat color id for user
	const generatedColorId = getRandomColor()

	//Add message-button event listener
	$("#message-form").on("submit", (event) => {

		//Prevent page from refreshing
		event.preventDefault()

		//Emit message to server
		socket.emit("message", {
			text: messageInput.val(),
			colorId: generatedColorId,
			from: username
		})

		//Clear text input
		messageInput.val("")
	})

	//Listen for message emit event
	socket.on("message", (data) => {
		//Append new message to messages div
		appendMessage(data)

		//Scroll messages div down to bottom
		scrollToBottom()
	})

	//Listen for user_join emit event
	socket.on("user_join", (data) => {
		$("#chat-messages").append(`<p style="color: #a8a8a8;">${data.user} has joined the chat</p>`)
	})

	//Listen for user_disconnect event
	socket.on("user_disconnect", (data) => {
		$("#chat-messages").append(`<p style="color: #a8a8a8;">${data.user} has left the chat</p>`)
	})

	//Listen for update emit event
	socket.on("update", (data) => {
		//Update users list
		updateUsersList(data)
	})

})

function appendMessage(data) {
	$("#chat-messages").append(`<p><strong style="color: ${data.colorId}">${data.from}</strong>: ${data.text}</p>`)
}


function scrollToBottom() {
	$("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
}

