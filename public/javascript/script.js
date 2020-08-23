const User = require("../../models/User")

const socket = io('http://localhost:5000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

//See if you can add a function that gets the username, and then display that to the appendMessage method


const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)


socket.on('chat-message', data =>
{
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name =>
{
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name =>
{
    appendMessage(`${name} disconnected`)
})


messageForm.addEventListener('submit', e=>
{
    //Prevent posting to server and refreshing
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    //Send message
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})
function appendMessage(message)
{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}